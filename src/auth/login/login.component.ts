import { Router } from '@angular/router';
import { AuthorizeService } from './../authorize.service';
import { NotificationService } from './../../shared/services/notification.service';
import { Actions, Controllers } from './../../shared/global-variables/api-config';
import { BaseService } from './../../shared/services/base.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  getFormControlByName(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  constructor(
    public spinner: NgxSpinnerService,
    private authService: AuthorizeService,
    private router: Router,
    private baseService: BaseService,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.loginForm.invalid){

    }
    else {
      this.spinner.show();
      const loginForm = this.loginForm.value;
      this.baseService.postItem(Controllers.Auth, Actions.Login, loginForm).subscribe(response => {
        this.spinner.hide();
        this.authService.setToken((response as any).accessToken);
        this.router.navigate(['/loockups/task-list']);
      }, error => {
        console.log(error);
        if(error.status === 400){
          this.notification.showNotification('Username or password is wrong', 'danger');
        }
        else {
          this.notification.showNotification('Something went wrong please contact system admin', 'danger');
        }
        this.spinner.hide();
      });
    }
  }
}
