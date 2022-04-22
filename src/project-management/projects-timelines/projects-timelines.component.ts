import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from '../../shared/models/project.model';
import { BaseResponse } from '../../loockups/models/base-response.model';
import { Controllers } from '../../shared/global-variables/api-config';
import { BaseService } from '../../shared/services/base.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-projects-timelines',
  templateUrl: './projects-timelines.component.html',
  styleUrls: ['./projects-timelines.component.scss']
})
export class ProjectsTimelinesComponent implements OnInit {

  @Input() projectId: number;
  public totalCount: number;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public projectsList: Project[] = [];

  public filterForm = new FormGroup({
    id: new FormControl(),
    clientName: new FormControl(),
    projectName: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10),
  });
  constructor(
    private baseService: BaseService,
    public spinner: NgxSpinnerService,
    private router: Router,
    public notification: NotificationService
  ) { }

  public ngOnInit(): void {
    setTimeout(() => {
      this.listProjects();
    }, 1000);
  }

  public listProjects() {
    this.spinner.show();
    
    if (this.projectId) {
      this.getFilterFormControlByName('id').setValue(this.projectId);
    }
    this.baseService.getList(Controllers.Project, this.filterForm.value).subscribe(projectsRes => {
      this.projectsList = (projectsRes as BaseResponse<Project>).entities;
      this.totalCount = (projectsRes as BaseResponse<Project>).totalCount;
      //this.dataSource = new MatTableDataSource(this.projectsList);
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
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

  public applyFilter(): void {
    this.listProjects();
  }
  public restFilter() {
    this.filterForm.reset()
    this.filterForm.get('pageNumber').setValue(1)
    this.filterForm.get('pageSize').setValue(10)
    this.listProjects();
  }

}
