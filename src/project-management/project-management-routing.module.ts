import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../auth/role.guard';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';
import { ProjectActionsComponent } from './project-actions/project-actions.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsTimelinesComponent } from './projects-timelines/projects-timelines.component';

const ProjectManagementRoutes: Routes = [
  {
    path: 'project-form/:id',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'Client', 'Production', 'Design', 'Repository', 'QC', 'QA', 'Sales', 'Finance'] }
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin'] }
  },
  {
    path: 'project-actions/:projectId',
    component: ProjectActionsComponent
  },
  {
    path: 'checklist-form/:approvalId',
    component: ChecklistFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin' ] }
  },
  {
    path: 'project-add',
    component: ProjectAddComponent
  },
  {
    path: 'projects-timelines',
    component: ProjectsTimelinesComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance' ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ProjectManagementRoutes)],
  exports: [RouterModule]
})
export class ProjectManagementRouting { }