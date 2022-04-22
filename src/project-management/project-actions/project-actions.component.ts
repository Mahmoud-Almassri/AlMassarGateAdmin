import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActionModel } from '../../shared/models/action.model';
import { BaseService } from '../../shared/services/base.service';
import { ActionCommentsDialogComponent } from '../action-comments-dialog/action-comments-dialog.component';

@Component({
  selector: 'app-project-actions',
  templateUrl: './project-actions.component.html',
  styleUrls: ['./project-actions.component.scss']
})
export class ProjectActionsComponent implements OnInit {

  public projectId: number;
  @Input() projectIdInput: number;
  public actions: ActionModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
        this.projectId = params.projectId ? params.projectId : this.projectIdInput;
        this.getActionsByApprovalId();
    })
  }

  public getActionsByApprovalId() {
    this.baseService.getActionsByProjectId(this.projectId).subscribe(res => {
      this.actions = res;
      this.spinner.hide();
    })
  }
  public fetchMonthFromDate(date: Date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let newDate = new Date(date);
    return monthNames[newDate.getUTCMonth()];
  }
  public openCommentsDialog(comments: string) {
    const dialogRef = this.dialog.open(ActionCommentsDialogComponent, {
      data: {
        comments
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}