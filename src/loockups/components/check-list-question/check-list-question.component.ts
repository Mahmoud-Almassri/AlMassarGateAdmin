import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { ChecklistQuestion } from '../../../loockups/models/lookups.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from '../../../loockups/models/base-response.model';
import * as loockups from '../../../shared/global-variables/lookups';
import { GroupTitle, Status } from '../../../loockups/models/enums.model';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../../shared/shared-components/yes-no-dialog/yes-no-dialog.component';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-check-list-question',
  templateUrl: './check-list-question.component.html',
  styleUrls: ['./check-list-question.component.scss']
})
export class CheckListQuestion extends BaseComponent implements OnInit {
  public isEdit = false;
  public displayedColumns: string[] = ['id', 'questionEnumId', 'questionText', 'status' , 'groupTitleId', 'actions'];
  public dataSource: MatTableDataSource<ChecklistQuestion>;
  public totalCount: number;
  public loockupsStatuses;
  public loockupsGroupTitle;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public ChecklistQuestionsList: ChecklistQuestion[] = [];
  public checklistQuestionForm = new FormGroup({
    id: new FormControl(0),
    questionEnumId: new FormControl('', Validators.required),
    questionText: new FormControl('', Validators.required),
    status: new FormControl(1, Validators.required),
    groupTitleId: new FormControl(1, Validators.required),
    createdById:new FormControl(),
    createdDate:new FormControl(),
    modifiedById:new FormControl(),
    modifiedDate:new FormControl(),
  });
  public filterForm = new FormGroup({
    questionEnumId: new FormControl(''),
    questionText: new FormControl(''),
    status: new FormControl(),
    groupTitleId: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(100),
  });
  constructor(
    public baseService: BaseService,
    public spinner: NgxSpinnerService,
    public notification: NotificationService,
    public dialog:MatDialog,
  ) {
    super(baseService,spinner,notification,dialog)
   }


  ngOnInit(): void {
    this.loockupsStatuses = Status;
    this.loockupsGroupTitle = GroupTitle;
    this.listChecklistQuestion()
  }
  public listChecklistQuestion() {
    this.spinner.show();
    this.baseService.getList(Controllers.CheckListQuestion, this.filterForm.value).subscribe(checklistQuestions => {
      this.ChecklistQuestionsList = (checklistQuestions as BaseResponse<ChecklistQuestion>).entities;
      this.totalCount = (checklistQuestions as BaseResponse<ChecklistQuestion>).totalCount;
      this.dataSource = new MatTableDataSource(this.ChecklistQuestionsList);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.listChecklistQuestion();
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.checklistQuestionForm.get(controlName) as FormControl;
  }
  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }
  public editItem(element: any): void {
    this.isEdit = true;
    this.checklistQuestionForm.patchValue(element);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('questionText').setValue(filterValue);
    this.listChecklistQuestion();
  }
  cancel(): void {
    this.isEdit = false;
    this.getFormControlByName('status').setValue(1);
    this.getFormControlByName('questionText').setValue('');
    this.getFormControlByName('questionEnumId').setValue(0);
  }
  public submitForm(formDirective: FormGroupDirective): void {
    if (this.checklistQuestionForm.invalid) {
      this.checklistQuestionForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const checklistQuestionForm = this.checklistQuestionForm.value;
      this.baseService.postItem(Controllers.CheckListQuestion, Actions.PostItem, checklistQuestionForm).subscribe(response => {
        this.spinner.hide();
        this.listChecklistQuestion()
        this.notification.showNotification('Question Added Successfully', 'success');
        this.cancel();
        formDirective.resetForm();
        this.checklistQuestionForm.reset();
      }, error => {
        console.log(error);
        if (error.status === 400) {
          this.notification.showNotification(error.error.Message, 'danger');
        }
        else {
          this.notification.showNotification('Something went wrong please contact system admin', 'danger');
        }
        this.spinner.hide();
      });
    }
  }
 
  public editForm(formDirective: FormGroupDirective): void {
    if (this.checklistQuestionForm.invalid) {
      this.checklistQuestionForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const checklistQuestionForm = this.checklistQuestionForm.value;
      this.baseService.postItem(Controllers.CheckListQuestion, Actions.EditItem, checklistQuestionForm).subscribe(response => {
        this.spinner.hide();
        this.listChecklistQuestion()
        this.notification.showNotification('Question Modified Successfully', 'success');
        this.cancel();
        formDirective.resetForm();
      }, error => {
        console.log(error);
        if (error.status === 400) {
          this.notification.showNotification(error.error.Message, 'danger');
        }
        else {
          this.notification.showNotification('Something went wrong please contact system admin', 'danger');
        }
        this.spinner.hide();
      });
    }
  }
  pushItemToList(item): void {
    this.ChecklistQuestionsList.push(item);
    this.dataSource._updateChangeSubscription();
  }

  deleteItemFromList(id: number): void {
    this.ChecklistQuestionsList = this.ChecklistQuestionsList.filter(checkListQuestion => checkListQuestion.id !== id);
  }
  onDelete(Id){
    const dialogRef = this.dialog.open(YesNoDialogComponent,{
      width:'400px',
      data:{
        title:'Confirm',
        content: 'Are you sure you want to delete ?'
      }
    })

    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.spinner.show();
        this.baseService.removeItem(Controllers.CheckListQuestion,Id).subscribe(res=>{
          this.spinner.hide()
          this.listChecklistQuestion();
          this.notification.showNotification('Question Deleted Successfully', 'success');
        },error=>{
          if (error.status === 400) {
            this.notification.showNotification(error.error.Message, 'danger');
          }
          else {
            this.notification.showNotification('Something went wrong please contact system admin', 'danger');
          }
          this.spinner.hide();
        })
      }
    })
  }

}
