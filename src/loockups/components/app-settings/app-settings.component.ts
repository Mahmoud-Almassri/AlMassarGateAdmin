import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppSettings } from '../../models/lookups.model';
import { Controllers } from '../../../shared/global-variables/api-config';
import { BaseService } from '../../../shared/services/base.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  public isEdit:boolean = false
  public appSettings : AppSettings
  public displayedColumns: string[] = ['aboutTitle', 'aboutDesc', 'aboutVision' , 'aboutMision' , 'contactEmail' , 'contactMob' , 'contactTitle','actions'];
  public dataSource: MatTableDataSource<AppSettings>;

  public appSettingsForm = new FormGroup({
    id:new FormControl(),
    aboutUsTitle: new FormControl(),
    aboutUsDescription: new FormControl(),
    aboutUsVision: new FormControl(),
    aboutUsMision: new FormControl(),
    contactUsEmail: new FormControl(),
    contactUsMobileNo: new FormControl(),
    contactUsLatitude: new FormControl(),
    contactUsLongitude: new FormControl(),
    contactUsTitle: new FormControl(),
    modifiedById: new FormControl(),
    createdById:new FormControl(),
    contactUsTitleAR: new FormControl(),
    aboutUsTitleAR: new FormControl(),
    aboutUsDescriptionAR: new FormControl(),
    aboutUsVisionAR: new FormControl(),
    aboutUsMisionAR: new FormControl(),
    address: new FormControl(),
    facebook: new FormControl(),
    youtube: new FormControl(),
    twitter: new FormControl(),
    linkedin: new FormControl(),

  })
  constructor(private baseService : BaseService , public spinner:NgxSpinnerService , public notification:NotificationService) { }

  ngOnInit(): void {
    this.getAppSettings()
  }

  getAppSettings(){
    this.baseService.getAppSettings().subscribe(res =>{
      this.appSettings = res as AppSettings
      this.appSettingsForm.patchValue(this.appSettings)
    },error =>{

    });
  }

  updateAppSettings(){
    this.spinner.show()
    const form = this.appSettingsForm.getRawValue()
    this.baseService.editItem(Controllers.AppSettings ,form ).subscribe(res =>{
      this.notification.showNotification('App Settings Updated Successfully','success')
      this.spinner.hide()
      this.isEdit = false;
    },error =>{
      this.spinner.hide()
      this.notification.showNotification('something went wrong please contact your administrator','danger')
    })
  }

  editItem(elemet){
    this.appSettingsForm.patchValue(elemet)
    this.isEdit = true
  }

  cancel(){
    this.appSettingsForm.reset()
    this.isEdit = false
  }

}
