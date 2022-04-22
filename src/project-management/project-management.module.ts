import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectManagementRouting } from './project-management-routing.module';
import { ProjectActionsComponent } from './project-actions/project-actions.component';
import { ActionCommentsDialogComponent } from './action-comments-dialog/action-comments-dialog.component';
import { ProjectsTimelinesComponent } from './projects-timelines/projects-timelines.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFileAddComponent } from './project-files-add/project-files-add.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';



@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectAddComponent,
    ProjectActionsComponent,
    ActionCommentsDialogComponent,
    ProjectsTimelinesComponent,
    ProjectDetailsComponent,
    ProjectFileAddComponent,
    ChecklistFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectManagementRouting
  ]
})
export class ProjectManagementModule { }
