import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { UserModel } from '../../../users-management/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from '../../../loockups/models/base-response.model';
import * as loockups from '../../../shared/global-variables/lookups';
import { BaseModel } from '../../../shared/models/models';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../../shared/shared-components/yes-no-dialog/yes-no-dialog.component';
import { Router } from '@angular/router';
import { Status } from '../../../loockups/models/enums.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'userName', 'phoneNumber', 'email', 'isActive', 'actions'];
  public dataSource: MatTableDataSource<UserModel>;
  public totalCount: number;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  public loockupsStatuses=Status;

  public usersList: UserModel[] = [];
  public roles: BaseModel[] = [];

  public filterForm = new FormGroup({
    roleType: new FormControl(),
    isActive: new FormControl(),
    remainingSubscription:new FormControl(),
    searchValue: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(100),
  });
  constructor(
    private baseService: BaseService,
    public spinner: NgxSpinnerService,
    private yesNoDialog: MatDialog,
    private router: Router,
    public notification: NotificationService
  ) { }

  public ngOnInit(): void {
    this.listUsers();
    this.getRoles();
  }
  public getRoles() {
    this.baseService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  public listUsers() {
    this.spinner.show();
    this.baseService.getList(Controllers.User, this.filterForm.value).subscribe(UserModels => {
      this.usersList = (UserModels as BaseResponse<UserModel>).entities;
      this.totalCount = (UserModels as BaseResponse<UserModel>).totalCount;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.listUsers();
  }
  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }
  public editItem(userId: number): void {
    this.router.navigate([`/users-management/view-edit-user/${userId}`]);
  }
  public applyFilter(): void {
    this.listUsers();
  }
  public restFilter() {
    this.filterForm.reset()
    this.filterForm.get('pageNumber').setValue(1)
    this.filterForm.get('pageSize').setValue(10)
    this.listUsers();
  }
  public updateUserStatus(user: UserModel, status: boolean) {
    user.isActive = status;
    this.baseService.updateUserInfo(user).subscribe(res => {
      this.notification.showNotification('User Status Modified Successfully', 'success');
      this.listUsers();
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
  public delete(userId: number) {
    const dialogRef = this.yesNoDialog.open(
      YesNoDialogComponent,
      {
        maxWidth: '400px',
        data:
        {
          title: 'Delete User',
          content: 'Are you sure?'
        }
      });
    dialogRef.afterClosed().subscribe(response => {

      if (response) {
        this.spinner.show();
        const Controller = Controllers.User;
        this.baseService.removeItem(Controller, userId).subscribe(res => {
          this.notification.showNotification('User Deleted Successfully', 'success');
          this.listUsers();
        }, error => {
          this.spinner.hide();
          if (error.status === 400) {
            this.notification.showNotification(error.error.Message, 'danger');
          }
          else {
            this.notification.showNotification('Something went wrong please contact system admin', 'danger');
          }
        });
      }
    });
  }
  public deleteItemFromList(id: number): void {
    this.usersList = this.usersList.filter(user => user.id !== id);
  }

}
