import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesEnum } from '../../shared/enums/entities.enum';
import { Lookup } from '../../shared/models/lookup.model';
import { Controllers } from '../../shared/global-variables/api-config';
import { Approval } from '../../shared/models/approval.model';
import { BaseService } from '../../shared/services/base.service';
import { ControlSettings } from '../../shared/models/control-settings.model';
import { TaskType } from '../../shared/enums/task-type.enum';
import { NotificationService } from '../../shared/services/notification.service';
import { environment } from '../../environments/environment';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseStatus } from '../../loockups/models/enums.model';
import { FileSaverService } from 'ngx-filesaver';
import { AuthorizeService } from '../../auth/authorize.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  public formDataToSubmit: FormData = new FormData();
  public approval: Approval = new Approval();
  public lookups: Lookup[] = [];
  public taskTypes = TaskType;
  public baseStatuses;
  public baseFilesUrl = environment.filesUrl;
  public isFetchedCompleted = false;
  public approvalId: number;
  public loggedInUserRole: any;
  public projectForm = new FormGroup({
    id: new FormControl(),
    specsFileName: new FormControl(),
    layoutFileName: new FormControl(),
    paymentTermsFileName: new FormControl(),
    numberOfPanels: new FormControl(),
    designReference: new FormControl(),
    projectName: new FormControl(),
    clientName: new FormControl(),
    projectGuid: new FormControl(),
    comments: new FormControl(),
    technicalProposalFileName: new FormControl(),
    financialProposalFileName: new FormControl(),
    subStatus: new FormControl(),
    technicalProposalProof: new FormControl(),
    financialProposalProof: new FormControl(),
    ironPhaseStartDate: new FormControl(),
    ironPhaseEndDate: new FormControl(),
    electricityPhaseStartDate: new FormControl(),
    electricityPhaseEndDate: new FormControl(),
    projectStartDate: new FormControl(),
    projectEndDate: new FormControl(),
  });

  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    public notification: NotificationService,
    public spinner: NgxSpinnerService,
    private fileSaverService: FileSaverService,
    private authorizeService: AuthorizeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.baseStatuses = BaseStatus;
    this.spinner.show();
    this.loggedInUserRole = this.authorizeService.getLoggedInUsersRole();
    this.getLookups();
  }
  public getFormControlByName(controlName: string): FormControl {
    return this.projectForm.get(controlName) as FormControl;
  }
  public getApprovalById(id: number) {
    this.baseService.getById(Controllers.Approval, id).subscribe(res => {
      this.approval = res;
      this.formDataToSubmit.append('approvalId', this.approval.id.toString());
      this.formDataToSubmit.append('id', this.approval.project.id.toString());
      this.projectForm.patchValue(this.approval.project);
      this.isFetchedCompleted = true;
      this.spinner.hide();
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate([`/loockups/task-list`])
      }
      else {
        this.notification.showNotification('Something went wrong please contact system admin', 'danger');
      }
      this.spinner.hide();
    })
  }
  public downloadQrCode(projectId: number, projectName: string) {
    this.baseService.downloadQrCode(environment.qrCodeUrl + projectId.toString()).subscribe(res => {
      this.fileSaverService.save(res, projectName + ' QrCode');
      this.spinner.hide();
      this.notification.showNotification('File Downloaded Successfully', 'success');
    }, error => {
      this.spinner.hide();
      this.notification.showNotification(error.error, 'danger');
    })
  }
  public getLookups() {
    this.baseService.getLookupsPyParent(EntitiesEnum.Project).subscribe(res => {
      this.lookups = res;
      this.route.params.subscribe(params => {
        if (params.id) {
          this.approvalId = params.id;
          this.getApprovalById(params.id);
        }
      }, err => {
        this.spinner.hide();
      });
    })
  }
  public fetchControlSettings(controlName: string): ControlSettings {
    if (this.isFetchedCompleted) {
      let control = this.lookups.find(x => x.key == controlName);
      let readOnly = this.approval.task.readOnlyControlsNumbers.find(x => x == control.value) ? true : false;
      let required = this.approval.task.requiredControlsNumbers.find(x => x == control.value) ? true : false;
      let settings = new ControlSettings(readOnly, required);
      if (settings.required) {
        this.getFormControlByName(controlName).setValidators(Validators.required);
      }
      if (settings.readOnly) {
        this.getFormControlByName(controlName).disable();
      }
      if (!settings.readOnly && !settings.required) {
        settings.hidden = true;
        return settings;
      }
      else {
        settings.hidden = false;
        return settings;
      }
    }
  }
  public fileSelected(file: File, controlName: string) {
    if (file) {
      this.formDataToSubmit.append(controlName, file);
    }
    console.log(file);
    console.log(this.formDataToSubmit);
  }
  public inputValueChanged(value: any, controlName: string) {
    this.formDataToSubmit.delete(controlName);
    if (controlName.includes('Date')) {
      let newDate = new Date(value.target.value);
      this.formDataToSubmit.append(controlName, newDate.toDateString());

    }
    else {
      this.formDataToSubmit.append(controlName, value.target.value);
    }
    console.log(value.target.value, controlName);
  }
  public selectValueChanged(value: any, controlName: string) {
    this.formDataToSubmit.append(controlName, value);
    console.log(value);
  } 


  public submitForm(actionType?: number) {

    if (actionType) {
      if (this.projectForm.invalid) {
        this.projectForm.markAllAsTouched();
        this.notification.showNotification('Please Check Form Fields', 'warning');
      }
      else {
        this.spinner.show();
        this.formDataToSubmit.append('actionType', actionType.toString());
        this.baseService.updateProject(this.formDataToSubmit).subscribe(res => {
          console.log(res);
          this.getApprovalById(this.approvalId);
          this.spinner.hide();
          this.notification.showNotification('Project Modified Successfully', 'success');
          this.router.navigate(['/loockups/task-list']);
        }, error => {
          if (error.status === 400) {
            this.notification.showNotification(error.error.title, 'danger');
          }
          else {
            this.notification.showNotification('Something went wrong please contact system admin', 'danger');
          }
          this.spinner.hide();
        })
      }
    }
  }

}
