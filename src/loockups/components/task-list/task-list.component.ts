import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Controllers } from '../../../shared/global-variables/api-config';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from '../../../loockups/models/base-response.model';
import { GroupTitle, Status } from '../../../loockups/models/enums.model';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../base/base.component';
import { Task } from '../../../loockups/models/lookups.model';
import { Router } from '@angular/router';
import { TaskType } from '../../../shared/enums/task-type.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent extends BaseComponent implements OnInit {
  public taskTypes = TaskType;
  public isEdit = false;
  public displayedColumns: string[] = ['approvalId', 'projectName', 'taskTitle', 'status', 'modifiedBy', 'modifiedDate', 'actions'];
  public dataSource: MatTableDataSource<Task>;
  public totalCount: number;
  public loockupsStatuses;
  public loockupsGroupTitle;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public TaskList: Task[] = [];

  public filterForm = new FormGroup({
    TaskTitle: new FormControl(''),
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
    private router: Router,
  ) {
    super(baseService,spinner,notification,dialog)
   }


  ngOnInit(): void {
    this.loockupsStatuses = Status;
    this.loockupsGroupTitle = GroupTitle;
    this.listTasks()
  }
  public listTasks() {
    this.spinner.show();
    this.baseService.getList(Controllers.Task, this.filterForm.value).subscribe(task => {
      this.TaskList = (task as BaseResponse<Task>).entities;
      this.totalCount = (task as BaseResponse<Task>).totalCount;
      this.dataSource = new MatTableDataSource(task.entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.listTasks();
  }


  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('TaskTitle').setValue(filterValue);
    this.listTasks();
  }
  public filterTasks(){
    this.spinner.show();
    this.baseService.GetSearchTasksList(Controllers.Task, this.filterForm.value).subscribe(tasks => {
      this.TaskList = (tasks as BaseResponse<Task>).entities;
      this.totalCount = (tasks as BaseResponse<Task>).totalCount;
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }

  pushItemToList(item): void {
    this.TaskList.push(item);
    this.dataSource._updateChangeSubscription();
  } 
  public onDetails(row){
    if(row.task.taskType == this.taskTypes.ChecklistSubmission){
       this.router.navigate([`/project-management/checklist-form/${row.id}`]);
    }else{
       this.router.navigate([`/project-management/project-form/${row.id}`]);
    }
  }

}
