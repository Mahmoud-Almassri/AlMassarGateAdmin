import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { RoleGuard } from '../auth/role.guard';
import { AdminLayoutComponent } from '../shared/admin-layout/admin-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'loockups/task-list', 
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './../shared/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  { path: 'auth', loadChildren: './../auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled',
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
