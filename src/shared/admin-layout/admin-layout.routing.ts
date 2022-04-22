import { Routes } from '@angular/router';
import { RoleGuard } from '../../auth/role.guard';
import { IconsComponent } from '../shared-components/icons/icons.component';
import { MapsComponent } from '../shared-components/maps/maps.component';
import { NotificationsComponent } from '../shared-components/notifications/notifications.component';
import { TableListComponent } from '../shared-components/table-list/table-list.component';
import { TypographyComponent } from '../shared-components/typography/typography.component';
import { UpgradeComponent } from '../shared-components/upgrade/upgrade.component';
import { UserProfileComponent } from '../shared-components/user-profile/user-profile.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    {
        path: 'loockups',
        loadChildren: '../../loockups/loockups.module#LoockupsModule',
        canActivate: [RoleGuard],
        data: { expectedRole: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance'] }
    },
    {
        path: 'project-management',
        loadChildren: '../../project-management/project-management.module#ProjectManagementModule',
        canActivate: [RoleGuard],
        data: { expectedRole: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance' ] }
    },
    {
        path: 'users-management',
        loadChildren: '../../users-management/users-management.module#UsersManagementModule',
        canActivate: [RoleGuard],
        data: { expectedRole: ['Admin'] }
    }   
];
