import { Routes } from '@angular/router';
import { count } from 'rxjs/operators';
import { RoleGuard } from '../auth/role.guard';
import { CheckListQuestion } from './components/check-list-question/check-list-question.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { PartComponent } from './components/part/part.component';
import { GroupComponent } from './components/group/group.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';


export const LoockupsRoutes: Routes = [
   
    {component: CheckListQuestion, path: 'check-list-question' },
    {component: AppSettingsComponent, path: 'app-settings' },
    {component: PartComponent, path: 'part' },
    {component: GroupComponent, path: 'group' },
    {component: ProjectListComponent, path: 'project-list',canActivate: [RoleGuard],  data: { expectedRole: ['Admin'] } },
    {component: TaskListComponent, path: 'task-list',canActivate: [RoleGuard],  data: { expectedRole: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance'] }}
];
