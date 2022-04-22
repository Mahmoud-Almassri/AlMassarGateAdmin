import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListQuestion } from './check-list-question.component';

describe('CheckListQuestionComponent', () => {
  let component: CheckListQuestion;
  let fixture: ComponentFixture<CheckListQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListQuestion ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
