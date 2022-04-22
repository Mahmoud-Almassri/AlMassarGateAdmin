import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCommentsDialogComponent } from './action-comments-dialog.component';

describe('ActionCommentsDialogComponent', () => {
  let component: ActionCommentsDialogComponent;
  let fixture: ComponentFixture<ActionCommentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionCommentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
