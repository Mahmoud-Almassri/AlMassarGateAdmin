import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Controllers } from '../../shared/global-variables/api-config';
import { Project } from '../../shared/models/project.model';
import { BaseService } from '../../shared/services/base.service';
import { TaskType } from '../../shared/enums/task-type.enum';
import { NotificationService } from '../../shared/services/notification.service';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseStatus } from '../../loockups/models/enums.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  public baseStatuses;
  public formDataToSubmit: FormData = new FormData();
  public project: Project = new Project();
  public taskTypes = TaskType;
  public baseFilesUrl = environment.filesUrl;
  public isFetchedCompleted = false;
  public projectId: number;
  public projectForm = new FormGroup({
    id: new FormControl(),
    specsFileName: new FormControl({ value: '', disabled: true }),
    layoutFileName: new FormControl({ value: '', disabled: true }),
    paymentTermsFileName: new FormControl({ value: '', disabled: true }),
    numberOfPanels: new FormControl({ value: '', disabled: true }),
    designReference: new FormControl({ value: '', disabled: true }),
    projectName: new FormControl({ value: '', disabled: true }),
    clientName: new FormControl({ value: '', disabled: true }),
    projectGuid: new FormControl({ value: '', disabled: true }),
    technicalProposalFileName: new FormControl({ value: '', disabled: true }),
    financialProposalFileName: new FormControl({ value: '', disabled: true }),
    subStatus: new FormControl({ value: '', disabled: true }),
    technicalProposalProof: new FormControl({ value: '', disabled: true }),
    financialProposalProof: new FormControl({ value: '', disabled: true }),
    ironPhaseStartDate: new FormControl({ value: '', disabled: true }),
    ironPhaseEndDate: new FormControl({ value: '', disabled: true }),
    electricityPhaseStartDate: new FormControl({ value: '', disabled: true }),
    electricityPhaseEndDate: new FormControl({ value: '', disabled: true }),
    projectStartDate: new FormControl({ value: '', disabled: true }),
    projectEndDate: new FormControl({ value: '', disabled: true }),
  });
  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    public notification: NotificationService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.baseStatuses=BaseStatus;
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getProjectById(params.id);
      }
    });
  }
  public getFormControlByName(controlName: string): FormControl {
    return this.projectForm.get(controlName) as FormControl;
  }
  public getProjectById(id: number) {
    this.baseService.getById(Controllers.Project, id).subscribe(res => {
      this.project = res;
      this.formDataToSubmit.append('projectId', this.project.id.toString());
      this.formDataToSubmit.append('id', this.project.id.toString());
      this.projectForm.patchValue(this.project);
      this.isFetchedCompleted = true;
      this.spinner.hide();
    })
  }
  public selectValueChanged(value: any, controlName: string) {
    this.formDataToSubmit.append(controlName, value.target.value);
    console.log(value);
  }
}
