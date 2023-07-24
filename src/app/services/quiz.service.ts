import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories, Category, QuestionAnwsersResponse, Results } from '../models/models';
import { AppConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private appUrl: string = AppConstants.APPURL;

  results: Results[] = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories<Category[]>> {
    const url: string = `${this.appUrl}api_category.php`;
    return this.http.get<Categories<Category[]>>(url);
  }

  getQuestionAnswers(noOfQuetions: number, category: number, difficulty: string): Observable<QuestionAnwsersResponse> {
    const url: string = `${this.appUrl}api.php?amount=${noOfQuetions}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<QuestionAnwsersResponse>(url);
  }

  setResultsData(results: Results[]): void {
    this.results = results;
  }

  getResultsData(): Results[] {
    return this.results;
  }
}
