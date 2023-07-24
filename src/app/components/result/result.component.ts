import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../constants/app.constants';
import { Results } from '../../models/models';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  results: Results[] = [];
  noOfCorrectAnswers: number = 0;
  noOfQuestions: number = AppConstants.NOOFQUETIONS;
  bgColor: string = '';

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.results = this.quizService.getResultsData();

    for (let obj of this.results) {
      if (obj.correct_answer === obj.selectedAnswer) {
        this.noOfCorrectAnswers++;
      }
    }

    if (this.noOfCorrectAnswers >= 0 && this.noOfCorrectAnswers <= 1) {
      this.bgColor = 'red';
    } else if (this.noOfCorrectAnswers >= 2 && this.noOfCorrectAnswers <= 3) {
      this.bgColor = 'yellow'
    } else if (this.noOfCorrectAnswers >= 4 && this.noOfCorrectAnswers <= 5) {
      this.bgColor = 'green';
    }
  }

}
