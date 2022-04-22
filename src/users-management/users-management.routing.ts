import { Routes } from '@angular/router';
import { RoleGuard } from '../auth/role.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ViewEditUserComponent } from './components/view-edit-user/view-edit-user.component';


export const UsersManagementRoutes: Routes = [
   
    {component: ListUsersComponent, path: 'list-users' },
    {component: ViewEditUserComponent, path: 'view-edit-user/:userId' },
    {component: AddUserComponent, path: 'add-user' },
];
