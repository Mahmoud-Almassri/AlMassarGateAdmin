import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Controllers } from '../../../shared/global-variables/api-config';
import { Project } from '../../../loockups/models/lookups.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from '../../../loockups/models/base-response.model';
import { GroupTitle, Status } from '../../../loockups/models/enums.model';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent extends BaseComponent implements OnInit {

 
  public isEdit = false;
  public displayedColumns: string[] = ['ProjectId','ProjectName', 'ClientName', 'Status', 'SubStatus' , 'actions'];
  public dataSource: MatTableDataSource<Project>;
  public totalCount: number;
  public loockupsStatuses;
  public loockupsGroupTitle;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public ProjectList: Project[] = [];

  public filterForm = new FormGroup({
    projectName: new FormControl(''),
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
    this.listProjects()
  }
  public listProjects() {
    this.spinner.show();
    this.baseService.getList(Controllers.Project, this.filterForm.value).subscribe(projects => {
      this.ProjectList = (projects as BaseResponse<Project>).entities;
      this.totalCount = (projects as BaseResponse<Project>).totalCount;
      this.dataSource = new MatTableDataSource(projects.entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.listProjects();
  }


  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('projectName').setValue(filterValue);
    this.filterProjects();
  }
  public filterProjects(){
    this.spinner.show();
    this.baseService.getList(Controllers.Project, this.filterForm.value).subscribe(projects => {
      this.ProjectList = (projects as BaseResponse<Project>).entities;
      this.totalCount = (projects as BaseResponse<Project>).totalCount;
      this.dataSource = new MatTableDataSource(projects.entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }

  pushItemToList(item): void {
    this.ProjectList.push(item);
    this.dataSource._updateChangeSubscription();
  }
  public onDetails(row){
    this.router.navigate([`/project-management/project-details/${row.id}`]);
  }



}
