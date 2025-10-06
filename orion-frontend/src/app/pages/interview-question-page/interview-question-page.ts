import { Component, OnInit } from '@angular/core';
import { InterviewQuestionService } from '../../services/interview-question-service';
import { InterviewQuestion } from '../../models/interview-question';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-interview-question-page',
  imports: [AsyncPipe],
  templateUrl: './interview-question-page.html',
  styleUrl: './interview-question-page.css'
})
export class InterviewQuestionPage implements OnInit {
  generatedQuestions$: Observable<InterviewQuestion[]> = of([])
  applicationId: number = 0;

  constructor(private interviewQuestionService: InterviewQuestionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.applicationId = Number(this.route.parent?.snapshot.params['id']);
    this.getQuestions();
  }

  generateQuestions(): void {
    this.interviewQuestionService.generateQuestions(this.applicationId);
  }

  getQuestions(): void {
    this.generatedQuestions$ = this.interviewQuestionService.getAllQuestions(this.applicationId);
  }

  deleteQuestion(questionId: number): void {
    this.interviewQuestionService.deleteQuestion(this.applicationId, questionId).subscribe();
  }
}
