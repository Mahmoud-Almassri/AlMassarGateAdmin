import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from '../../shared/global-variables/api-config';
import { BaseService } from '../../shared/services/base.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  public formDataToSubmit: FormData = new FormData();
  public projectForm = new FormGroup({
    financialProposalFile: new FormControl() 
  });
  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    public notification: NotificationService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
  }
  public getFormControlByName(controlName: string): FormControl {
    return this.projectForm.get(controlName) as FormControl;
  }
  
  public fileSelected(file: File, controlName: string) {
    if (file) {
      this.formDataToSubmit.append(controlName, file);
    }
    console.log(file);
    console.log(this.formDataToSubmit);
  }


  public submitForm() {

      if (this.projectForm.invalid) {
        this.projectForm.markAllAsTouched();
        this.notification.showNotification('Please Check Form Fields', 'warning');
      }
      else {
        this.spinner.show();
        this.baseService.patchItem(Controllers.Project,Actions.PostItem,this.formDataToSubmit).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          this.notification.showNotification('Project Created Successfully', 'success');
        }, error => {
          this.spinner.hide();
          this.notification.showNotification(error.error, 'danger');
        })
      }
  }
  public cancel() {
    window.history.back();
  }
}
