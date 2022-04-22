import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from '../../../shared/services/base.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { FileUploaderActions } from '../../../shared/enums/file-type.enum';
import { FileSaverService } from 'ngx-filesaver';
import {  Controllers } from '../../../shared/global-variables/api-config';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @Input() action: FileUploaderActions;
  @Input() readOnly: boolean;
  @Input() elementName: string;
  @Input() elementId: string;
  @Input() buttonText: string;
  @Input() fileLocation: string;
  @Input() isDeleteAllowed: boolean;
  public fileData: any;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter();
  @Output() fileDeleted: EventEmitter<File> = new EventEmitter();
  constructor(private baseService: BaseService,
    public notification: NotificationService,
    public spinner: NgxSpinnerService,
    private fileSaverService: FileSaverService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public fileUploaderChanged(event) {
    console.log(event.target.files[0]);
    let selectedFile = event.target.files[0];
    this.fileData = selectedFile.name;
    this.fileSelected.emit(selectedFile);

  }
  public openUploader() {
    let input = document.getElementById(this.elementId);
    input.click();
  }
  public downloadFile() {
    this.spinner.show();
    return this.baseService.downloadFile(this.fileLocation).subscribe(res => {
      this.fileSaverService.save(res, this.elementName);
      this.spinner.hide();
      this.notification.showNotification('File Downloaded Successfully', 'success');
    }, error => {
      this.spinner.hide();
      this.notification.showNotification(error.error, 'danger');
    })
  }
  public deleteFile() {
    const dialogRef = this.dialog.open(YesNoDialogComponent,{
      width:'400px',
      data:{
        title:'Confirm',
        content: 'Are you sure you want to delete this file?'
      }
    })

    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.spinner.show();        
        this.baseService.removeItem(Controllers.Project,Number(this.elementId)).subscribe(res=>{
          this.fileDeleted.emit();
          this.spinner.hide();
          this.notification.showNotification('File Deleted Successfully', 'success');
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
