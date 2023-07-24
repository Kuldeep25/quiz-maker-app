import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Results } from '../../../models/models';
import { AppConstants } from '../../../constants/app.constants';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent {
  @Input() results: Results[] = [];
  showSubmitBtn: boolean = false;

  constructor(private route: Router, private quizService: QuizService) { }

  setSelectedAnswer(questionIndex: number, answerIndex: number, selectedAnswer: string): void {
    //set selected answer
    if (this.results[questionIndex].answerIndex !== answerIndex) {
      this.results[questionIndex].answerIndex = answerIndex;
      this.results[questionIndex].selectedAnswer = selectedAnswer;
    } else {
      this.results[questionIndex].answerIndex = -1;
      this.results[questionIndex].selectedAnswer = '';
    }

    // disabled submit button if all quetions not answered
    let result = this.results.filter(ele => ele.selectedAnswer && ele.selectedAnswer !== '');
    if (result.length === AppConstants.NOOFQUETIONS) {
      this.showSubmitBtn = true;
    } else {
      this.showSubmitBtn = false;
    }
  }

  //submit and navigate to result component.
  submitQuetionAnswers(): void {
    this.quizService.setResultsData(this.results);
    this.route.navigate(['/', 'result']);
  }

}
