import { Component, OnInit } from '@angular/core';
import { GroupTitle, Status } from '../../models/enums.model';
import { BaseService } from '../../../shared/services/base.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-base',
  template: ``,
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public loockupsStatuses = [];
  public loockupsgroupTitle = [];
  constructor(public baseService: BaseService,
    public spinner: NgxSpinnerService,
    public notification: NotificationService,
    public dialog:MatDialog,) { }

  ngOnInit(): void {
    debugger;
    this.loockupsStatuses = Status;
    this.loockupsgroupTitle = GroupTitle;
  }

  getStatusName(statusId){
    const status = this.loockupsStatuses.find(x=>x.id == statusId)
    return status ? status.name : status 
  }
  getgroupTitleName(groupTitleId){
    this.loockupsgroupTitle = GroupTitle;
    const groupTitle = this.loockupsgroupTitle.find(x=>x.id == groupTitleId)
    return groupTitle ? groupTitle.name : groupTitle 
  }

}
