import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './../app/material.module';
import { AuthRouting } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeGuard } from './authorize.guard';
import { AuthorizeInterceptor } from './authorize.interceptor';
import { RoleGuard } from './role.guard';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRouting,
    
  ],
  declarations: [
    LoginComponent,
    AuthComponent

  ],
  providers:[AuthorizeGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }]
})
export class AuthModule { }
