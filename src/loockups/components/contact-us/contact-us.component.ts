import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactUs } from '../../models/lookups.model';
import { Controllers } from '../../../shared/global-variables/api-config';
import { BaseService } from '../../../shared/services/base.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseResponse } from '../../models/base-response.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'email', 'subject' , 'message'];
  public dataSource: MatTableDataSource<ContactUs>;
  public contactUsList : ContactUs[]
  public totalCount: number;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  public filterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(100),
  });

  constructor(private baseService:BaseService , private spinner : NgxSpinnerService , private notification:NotificationService) { }

  ngOnInit(): void {
    this.getContactUSList()
  }
  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }
  getContactUSList(){
    this.spinner.show()
    this.baseService.getList(Controllers.ContactUS ,  this.filterForm.value).subscribe(res =>{
      this.contactUsList = (res as BaseResponse<ContactUs>).entities;
      this.totalCount = (res as BaseResponse<ContactUs>).totalCount;
      this.dataSource = new MatTableDataSource(this.contactUsList);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide()
    },error=>{
      this.spinner.hide()
    })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('name').setValue(filterValue);
    this.getContactUSList();
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.getContactUSList();
  }

}
