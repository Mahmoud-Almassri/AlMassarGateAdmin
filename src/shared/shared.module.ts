import { YesNoDialogComponent } from './shared-components/yes-no-dialog/yes-no-dialog.component';
import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { RouterModule } from '@angular/router';
import { LoockupsModule } from '../loockups/loockups.module';
import { AuthorizeInterceptor } from '../auth/authorize.interceptor';
import { RoleGuard } from '../auth/role.guard';
import { UsersManagementModule } from '../users-management/users-management.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import { AuthorizeService } from '../auth/authorize.service';
import { FileUploaderComponent } from './shared-components/file-uploader/file-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartComponent } from '../loockups/components/part/part.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AdminLayoutModule,
    RouterModule,
    LoockupsModule,
    UsersManagementModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [
    SharedComponent,
    YesNoDialogComponent,
    SidebarComponent,
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    FileUploaderComponent,
    PartComponent
  ],
  exports:[
    SharedComponent,
    YesNoDialogComponent,
    SidebarComponent, 
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    FileUploaderComponent,
    PartComponent
  ],
  
  providers:[
    AuthorizeService,
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ]
})
export class SharedModule { }
