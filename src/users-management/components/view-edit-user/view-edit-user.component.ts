import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { UserModel } from '../../../users-management/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../loockups/models/enums.model';

@Component({
  selector: 'app-view-edit-user',
  templateUrl: './view-edit-user.component.html',
  styleUrls: ['./view-edit-user.component.scss']
})
export class ViewEditUserComponent implements OnInit {

  public user: UserModel;
  public userId: number;
  public loockupsStatuses = Status;


  public userForm = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl('', Validators.required),
    userName: new FormControl({ value: '', disabled: true }),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    isActive: new FormControl(),
    remainingSubscription: new FormControl(),
    remainingSubscriptionModifiedDate: new FormControl(),
  });
  constructor(
    private baseService: BaseService,
    public spinner: NgxSpinnerService,
    private yesNoDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public notification: NotificationService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.getUser(params.userId);
    });
  }

  public getUser(userId: number) {
    this.baseService.getById(Controllers.User, userId).subscribe(user => {
      this.user = user;
      this.userForm.patchValue(this.user);
      this.spinner.hide();
    })
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }


  public submitForm(status?: boolean, remainingSubscription?: number) {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      if (status !== null || status !== undefined) {
        this.getFormControlByName('isActive').setValue(status);
      }
      if (remainingSubscription) {
        this.getFormControlByName('remainingSubscription').setValue(this.user.remainingSubscription);
      }
      else {
        this.getFormControlByName('remainingSubscription').setValue(null);
      }
      this.baseService.updateUserInfo(this.userForm.value).subscribe(res => {
        this.notification.showNotification('User Modified Successfully', 'success');
        this.getUser(this.userId);
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
}
