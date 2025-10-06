import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewQuestionPage } from './interview-question-page';

describe('InterviewQuestionPage', () => {
  let component: InterviewQuestionPage;
  let fixture: ComponentFixture<InterviewQuestionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewQuestionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
