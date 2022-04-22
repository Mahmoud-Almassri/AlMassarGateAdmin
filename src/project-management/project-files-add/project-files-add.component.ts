import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from '../../shared/global-variables/api-config';
import { BaseService } from '../../shared/services/base.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-project-files-add',
  templateUrl: './project-files-add.component.html',
  styleUrls: ['./project-files-add.component.scss']
})
export class ProjectFileAddComponent implements OnInit {
  @Input() projectId: number;
  public formDataToSubmit: FormData = new FormData();
  @Output() fileAdded: EventEmitter<File> = new EventEmitter();
  public projectFileForm = new FormGroup({
    file: new FormControl(),
    name: new FormControl('', Validators.required)
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
    return this.projectFileForm.get(controlName) as FormControl;
  }

  public fileSelected(file: File, controlName: string) {
    if (file) {
      this.formDataToSubmit.append(controlName, file);
    }
    console.log(file);
    console.log(this.formDataToSubmit);
  }


  public submitForm() {
    this.formDataToSubmit.append('projectId', this.projectId.toString());
    this.formDataToSubmit.append('name', this.getFormControlByName('name').value);
    if (this.projectFileForm.invalid) {
      this.projectFileForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      this.baseService.patchItem(Controllers.Project, Actions.AddFile, this.formDataToSubmit).subscribe(res => {
        console.log(res);
        this.fileAdded.emit();
        this.spinner.hide();
        this.notification.showNotification('Project File Added Successfully', 'success');
      }, error => {
        this.formDataToSubmit=new FormData();
        this.spinner.hide();
        this.notification.showNotification(error.error, 'danger');
      })
    }
  }
  public cancel() {
    window.history.back();
  }
}
