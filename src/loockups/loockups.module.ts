import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListQuestion } from './components/check-list-question/check-list-question.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeInterceptor } from '../auth/authorize.interceptor';
import { RoleGuard } from '../auth/role.guard';
import { RouterModule } from '@angular/router';
import { LoockupsRoutes } from './loockups.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from './components/base/base.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { PartComponent } from './components/part/part.component';
import { GroupComponent } from './components/group/group.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [
    CheckListQuestion, 
    BaseComponent, 
    AppSettingsComponent, GroupComponent, ProjectListComponent, TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule,
    RouterModule.forChild(LoockupsRoutes),
  ],
  providers: [
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ]
})
export class LoockupsModule { }
