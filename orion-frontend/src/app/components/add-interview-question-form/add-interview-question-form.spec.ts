import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewQuestionForm } from './add-interview-question-form';

describe('AddInterviewQuestionForm', () => {
  let component: AddInterviewQuestionForm;
  let fixture: ComponentFixture<AddInterviewQuestionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInterviewQuestionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterviewQuestionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
