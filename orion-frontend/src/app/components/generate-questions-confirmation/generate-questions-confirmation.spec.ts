import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQuestionsConfirmation } from './generate-questions-confirmation';

describe('GenerateQuestionsConfirmation', () => {
  let component: GenerateQuestionsConfirmation;
  let fixture: ComponentFixture<GenerateQuestionsConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQuestionsConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQuestionsConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
