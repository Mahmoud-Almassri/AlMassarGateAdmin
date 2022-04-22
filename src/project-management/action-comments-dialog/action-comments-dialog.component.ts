import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-action-comments-dialog',
  templateUrl: './action-comments-dialog.component.html',
  styleUrls: ['./action-comments-dialog.component.css']
})
export class ActionCommentsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
  }

}
