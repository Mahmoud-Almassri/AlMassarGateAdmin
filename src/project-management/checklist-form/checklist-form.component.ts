import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from '../../shared/global-variables/api-config';
import { ChecklistAnswer, ChecklistQuestion } from '../../loockups/models/lookups.model';
import { BaseService } from '../../shared/services/base.service';
import { CheckListAnswers, GroupTitle } from '../../loockups/models/enums.model';
import { ChecklistQuestionGroup, SubmitQcModel } from '../../shared/models/checklist-question-group.model';
import { NotificationService } from '../../shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss']
})
export class ChecklistFormComponent implements OnInit {

  public checklistQuestions: ChecklistQuestion[] = [];
  public checklistQuestionGroups: ChecklistQuestionGroup[] = [
    { groupTitleId: 1, groupTitleName: 'How', checkListQuestions: [] },
    { groupTitleId: 2, groupTitleName: 'What', checkListQuestions: [] },
    { groupTitleId: 3, groupTitleName: 'When', checkListQuestions: [] }
  ];
  public loockupsGroupTitle;
  public checkListAnswers;
  public approvalId: number;
  public comments: string;
  public dataToSubmit: SubmitQcModel = new SubmitQcModel();
  public checkListAnswersToSubmit: ChecklistAnswer[] = [];
  constructor(
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loockupsGroupTitle = GroupTitle;
    this.checkListAnswers = CheckListAnswers;
    this.spinner.show();
    this.getchecklistQuestions();
    this.route.params.subscribe(params => {
      this.approvalId = params.approvalId;
    })
  }

  public getchecklistQuestions() {
    this.baseService.getSpecificAction(Controllers.CheckListQuestion, Actions.GetAllRecordsWithAnswers).subscribe(res => {
      this.checklistQuestions = res;
      this.checklistQuestionGroups.forEach(element => {
        element.checkListQuestions = this.checklistQuestions.filter(x => x.groupTitleId == element.groupTitleId);
      });
      console.log(this.checklistQuestionGroups);

      this.spinner.hide();
    });
  }
  public answerSelected(event, questionId: number, answerId?: number) {
    console.log(event.value);
    console.log(questionId);
    let oldAnswer = this.checkListAnswersToSubmit.find(x => x.checklistQuestionId == questionId);
    if (oldAnswer) {
      oldAnswer.answer = event.value;
    }
    else {
      let answerToAdd = {
        answer: event.value,
        approvalId: this.approvalId,
        checklistQuestionId: questionId,
        answerId: answerId ? answerId : null
      }
      this.checkListAnswersToSubmit.push(answerToAdd);
    }

  }
  public submitForm(actionType?: number) {

    this.spinner.show();
    this.dataToSubmit.approvalId = this.approvalId;
    this.dataToSubmit.comments = this.comments;
    this.dataToSubmit.checkListAnswes = this.checkListAnswersToSubmit;
    this.baseService.postItem(Controllers.Project, Actions.SubmitQcForm, this.dataToSubmit).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.notification.showNotification('QC Form Submitted Successfully', 'success');
    }, error => {
      this.spinner.hide();
      this.notification.showNotification(error.error, 'danger');
    })
  }
}
