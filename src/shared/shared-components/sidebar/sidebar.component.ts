import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../../auth/authorize.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  hasChildren?: boolean;
  children?: RouteInfo[];
  subMenuId?: string;
  authRoles?: string[];
}
export const ROUTES: RouteInfo[] = [
  { path: '/loockups/task-list', title: 'Task List', icon: 'villa', class: '', authRoles: [ 'Admin','DataEntry'] },
  {
    path: 'ProjectsManagement', title: 'Projects Management', icon: 'contact_page', class: '', hasChildren: true, subMenuId: 'projectManagementSubMenu', authRoles: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance'],
    children: [
      { path: '/project-management/project-add', title: 'Add New Project', icon: 'supervisor_account', class: 'sub-menu', hasChildren: false,authRoles: ['Finance'] },
      { path: '/project-management/projects-timelines', title: 'Project Timelines', icon: 'supervisor_account', class: 'sub-menu', hasChildren: false,authRoles: ['Admin','Client','Production','Design','Repository','QC','QA','Sales','Finance'] },
      { path: '/loockups/project-list', title: 'Project List', icon: 'badge', class: '', authRoles: [ 'Admin','DataEntry'] },
    ]
  },
  {
    path: 'UsersManagement', title: 'Users Management', icon: 'manage_accounts', class: '', hasChildren: true, subMenuId: 'userManagementSubMenu', authRoles: ['Admin'],
    children: [
      { path: '/users-management/list-users', title: 'List Users', icon: 'supervisor_account', class: 'sub-menu', hasChildren: false },
      { path: '/users-management/add-user', title: 'Add New User', icon: 'supervisor_account', class: 'sub-menu', hasChildren: false },
    ]
  },
];
export const LOOCKUPS_ROUTES: RouteInfo[] = [
  { path: '/loockups/check-list-question', title: 'Check List Question', icon: 'supervised_user_circle', class: '', authRoles: [ 'Admin','DataEntry'] },
  { path: '/loockups/part', title: 'Part', icon: 'cases', class: '', authRoles: [ 'Admin','DataEntry'] },
  { path: '/loockups/group', title: 'Group', icon: 'business', class: '', authRoles: [ 'Admin','DataEntry'] },
  { path: '/loockups/app-settings', title: 'App Settings', icon: 'settings', class: '', authRoles: ['SuperAdmin'] },

  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  loockupsItems: any[];
  public authorizeRoles;
  constructor(private authService: AuthorizeService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.loockupsItems = LOOCKUPS_ROUTES.filter(menuItem => menuItem);
    this.authorizeRoles = this.authService.getLoggedInUsersRole();
  }
  public checkRoles(tabRoles: string[]) {
    if (this.authorizeRoles.find(x => tabRoles.find(t => t == x))) {
      return true;
    }
    return false;
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
