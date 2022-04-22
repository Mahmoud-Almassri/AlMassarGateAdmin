import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { BaseService } from '../../../shared/services/base.service';
import { Actions, Controllers } from '../../../shared/global-variables/api-config';
import { Part } from '../../../loockups/models/lookups.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from '../../../loockups/models/base-response.model';
import * as loockups from '../../../shared/global-variables/lookups';
import { GroupTitle, Status } from '../../../loockups/models/enums.model';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../../shared/shared-components/yes-no-dialog/yes-no-dialog.component';
import { BaseComponent } from '../base/base.component';
@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent extends BaseComponent implements OnInit {

  public isEdit = false;
  public displayedColumns: string[] = ['id', 'partNumber', 'partName', 'available' , 'priceForUnit', 'actions'];
  public dataSource: MatTableDataSource<Part>;
  public totalCount: number;
  public loockupsStatuses;
  public loockupsGroupTitle;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public PartsList: Part[] = [];
  public partForm = new FormGroup({
    id: new FormControl(0),
    partNumber: new FormControl('', Validators.required),
    partName: new FormControl('', Validators.required),
    available: new FormControl('', Validators.required),
    priceForUnit: new FormControl('', Validators.required),
    createdById:new FormControl(),
    createdDate:new FormControl(),
    modifiedById:new FormControl(),
    modifiedDate:new FormControl(),
  });
  public filterForm = new FormGroup({
    partNumber: new FormControl(''),
    partName: new FormControl(''),
    available: new FormControl(),
    priceForUnit: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(100),
  });
  constructor(
    public baseService: BaseService,
    public spinner: NgxSpinnerService,
    public notification: NotificationService,
    public dialog:MatDialog,
  ) {
    super(baseService,spinner,notification,dialog)
   }


  ngOnInit(): void {
    this.loockupsStatuses = Status;
    this.loockupsGroupTitle = GroupTitle;
    this.listParts()
  }
  public listParts() {
    this.spinner.show();
    this.baseService.getList(Controllers.Part, this.filterForm.value).subscribe(Parts => {
      this.PartsList = (Parts as BaseResponse<Part>).entities;
      this.totalCount = (Parts as BaseResponse<Part>).totalCount;
      this.dataSource = new MatTableDataSource(this.PartsList);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })
  }
  public changePage(event): void {
    this.getFilterFormControlByName('pageNumber').setValue(event.pageIndex + 1)
    this.getFilterFormControlByName('pageSize').setValue(event.pageSize)
    this.listParts();
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.partForm.get(controlName) as FormControl;
  }
  public getFilterFormControlByName(controlName: string): FormControl {
    return this.filterForm.get(controlName) as FormControl;
  }
  public editItem(element: any): void {
    this.isEdit = true;
    this.partForm.patchValue(element);
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getFilterFormControlByName('partName').setValue(filterValue);
    this.listParts();
  }
  cancel(): void {
    this.isEdit = false;
    this.getFormControlByName('status').setValue(1);
    this.getFormControlByName('name').setValue('');
    this.getFormControlByName('id').setValue(0);
  }
  public submitForm(formDirective: FormGroupDirective): void {
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const partForm = this.partForm.value;
      this.baseService.postItem(Controllers.Part, Actions.PostItem, partForm).subscribe(response => {
        this.spinner.hide();
        this.listParts();
        this.notification.showNotification('Part Added Successfully', 'success');
        this.cancel();
        formDirective.resetForm();
        this.partForm.reset();
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
 
  public editForm(formDirective: FormGroupDirective): void {
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      this.notification.showNotification('Please Check Form Fields', 'warning');
    }
    else {
      this.spinner.show();
      const partForm = this.partForm.value;
      this.baseService.postItem(Controllers.Part, Actions.EditItem, partForm).subscribe(response => {
        this.spinner.hide();
        this.listParts()
        this.notification.showNotification('Part Modified Successfully', 'success');
        this.cancel();
        formDirective.resetForm();
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
  pushItemToList(item): void {
    this.PartsList.push(item);
    this.dataSource._updateChangeSubscription();
  }

  deleteItemFromList(id: number): void {
    this.PartsList = this.PartsList.filter(part => part.id !== id);
  }
  onDelete(Id){
    const dialogRef = this.dialog.open(YesNoDialogComponent,{
      width:'400px',
      data:{
        title:'Confirm',
        content: 'Are you sure you want to delete ?'
      }
    })

    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.spinner.show();
        this.baseService.removeItem(Controllers.Part,Id).subscribe(res=>{
          this.spinner.hide()
          this.listParts();
          this.notification.showNotification('Part Deleted Successfully', 'success');
        },error=>{
          if (error.status === 400) {
            this.notification.showNotification(error.error.Message, 'danger');
          }
          else {
            this.notification.showNotification('Something went wrong please contact system admin', 'danger');
          }
          this.spinner.hide();
        })
      }
    })
  }

}
