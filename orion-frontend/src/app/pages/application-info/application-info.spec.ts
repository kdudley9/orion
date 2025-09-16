import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInfo } from './application-info';

describe('ApplicationInfo', () => {
  let component: ApplicationInfo;
  let fixture: ComponentFixture<ApplicationInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
