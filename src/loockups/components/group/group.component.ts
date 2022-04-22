import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { ChecklistQuestion, UserRoles } from '../../../loockups/models/lookups.model';
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
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent extends BaseComponent implements OnInit {
  public isEdit = false;
  public displayedColumns: string[] = ['roleName', 'userName', 'actions'];
  public dataSource: MatTableDataSource<ChecklistQuestion>;
  public totalCount: number;
  public loockupsStatuses;
  public loockupsGroupTitle;
  public RolesList: UserRoles[] = [];
  public UsersList: UserRoles[] = [];
  public UsersRolesList: any[] = [];
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  // @ViewChild(MatSort) public sort: MatSort;

  public ChecklistQuestionsList: ChecklistQuestion[] = [];
  public groupForm = new FormGroup({
    roleId: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),

  });
  public filterForm = new FormGroup({
    userName: new FormControl(''),
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
    this.getRolesList();
    this.getUsersList();
    this.filterUsersRoles();
  }

  public getRolesList() {
    this.spinner.show();
    this.baseService.getRoles().subscribe(groups => {
      this.RolesList = groups;
      // this.dataSource = new MatTableDataSource(this.UserRolesList);
      //this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public getUsersList() {
    this.spinner.show();
    this.baseService.getUsers().subscribe(users => {
      this.UsersList = users;
      // this.dataSource = new MatTableDataSource(this.UserRolesList);
      //this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }

  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.filterUsersRoles();
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.groupForm.get(controlName) as FormControl;
  }
  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }
  public editItem(element: any): void {
    this.isEdit = true;
    this.groupForm.patchValue(element);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('userName').setValue(filterValue);
    this.filterUsersRoles();
  }
  public filterUsersRoles(){
    this.spinner.show();
    this.baseService.GetSearchUsersRolesList(Controllers.Group, this.filterForm.value).subscribe(userRole => {
      this.UsersRolesList = (userRole as BaseResponse<UserRoles>).entities;
      this.totalCount = (userRole as BaseResponse<UserRoles>).totalCount;
      this.dataSource = new MatTableDataSource(this.UsersRolesList);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  cancel(): void {
    this.isEdit = false;
    this.getFormControlByName('status').setValue(1);
    this.getFormControlByName('name').setValue('');
    this.getFormControlByName('id').setValue(0);
  }
  public submitForm(formDirective: FormGroupDirective): void {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const groupForm = this.groupForm.value;
      this.baseService.postItem(Controllers.Group, Actions.AddUserGroup, groupForm).subscribe(response => {
        this.spinner.hide();
        this.filterUsersRoles()
        this.notification.showNotification('Group Added Successfully', 'success');
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
 
  public editForm(formDirective: FormGroupDirective): void {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const groupForm = this.groupForm.value;
      this.baseService.postItem(Controllers.CheckListQuestion, Actions.EditItem, groupForm).subscribe(response => {
        this.spinner.hide();
        this.filterUsersRoles()
        this.notification.showNotification('Group Modified Successfully', 'success');
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
  onDelete(data){
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
        let userRole ={
          roleId: data.roleId,
          userId: data.userId
        }
        this.baseService.RemoveUserRole(Controllers.Group,userRole).subscribe(res=>{
          this.spinner.hide()
          this.filterUsersRoles();
          this.notification.showNotification('Group Deleted Successfully', 'success');
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
