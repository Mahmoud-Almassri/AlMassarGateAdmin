import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { Router } from '@angular/router';
import { BaseModel } from '../../../shared/models/models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public roles: BaseModel[] = [];

  public userForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    address: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    roleId: new FormControl(1, Validators.required),
  });
 
  constructor(
    private baseService: BaseService,
    public spinner: NgxSpinnerService,
    public router: Router,
    public notification: NotificationService
  ) { }

  public ngOnInit(): void {
    this.getRoles();
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.userForm.get(controlName) as FormControl;
  }
  public getRoles() {
    this.baseService.getUserRoles().subscribe(roles => {
      this.roles = roles.filter(x=>x.name!='User');
    });
  }
  public submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      this.baseService.postItem(Controllers.User, Actions.Register, this.userForm.value).subscribe(res => {
        this.notification.showNotification('User Added Successfully', 'success');
        this.spinner.hide();
        this.router.navigate(['/users-management/list-users'])
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
