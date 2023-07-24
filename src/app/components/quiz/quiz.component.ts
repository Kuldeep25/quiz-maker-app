import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { decode } from 'html-entities';
import { Subscription } from 'rxjs';
import { AppConstants } from '../../constants/app.constants';
import { Categories, Category, DifficultyLevel, QuestionAnwsersResponse, QuizForm } from '../../models/models';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  difficultyLevels: DifficultyLevel[] = [
    { id: '', name: 'Select difficulty level' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];
  categoryList: Categories<Category[]>;
  quizForm: FormGroup = this.fb.group({
    category: ['Select category', [Validators.required]],
    difficultyLevel: ['', [Validators.required]],
  })

  noOfQuetions: number = AppConstants.NOOFQUETIONS;
  catSubscription: Subscription = new Subscription();
  questionAnwsersResponse: QuestionAnwsersResponse;

  constructor(private quizService: QuizService, public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.catSubscription = this.quizService.getCategories().subscribe((responce: Categories<Category[]>) => {
      this.categoryList = responce;
    });
  }

  submitQuizForm(): void {
    if (this.quizForm.invalid) {
      return;
    } else {
      const formData: QuizForm = this.quizForm.value;
      const category: number = formData.category;
      const difficultyLevel: string = formData.difficultyLevel;

      this.catSubscription = this.quizService.getQuestionAnswers(this.noOfQuetions, category, difficultyLevel).subscribe((res: QuestionAnwsersResponse) => {
        // create new question Answers list on click on create buttton.
        for (let result of res.results) {
          result.question = decode(result.question);
          result.correct_answer = decode(result.correct_answer);
          result.selectedAnswer = '';

          // create random index and add correct answer into array
          const randomIndex = Math.floor(Math.random() * 4);
          result.incorrect_answers.splice(randomIndex, 0, result.correct_answer);
          for (const [index, value] of result.incorrect_answers.entries()) {
            result.incorrect_answers[index] = decode(value);
          }
        }

        this.questionAnwsersResponse = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.catSubscription.unsubscribe();
  }

}
