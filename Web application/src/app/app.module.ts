import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// User components
import { UserLoginComponent } from './user/login/user-login.component';
import { UserRegisterComponent } from './user/register/user-register.component';
import { UserLogoutComponent } from './user/logout/user-logout.component';
import { UserInfoComponent } from './user/info/user-info.component';
import { UserChangePasswordComponent } from './user/change-password/user-change-password.component';
import { UserResendEmailComponent } from './user/resend-email/user-resend-email.component';

import { AdminUserComponent } from './admin/user/admin-user.component';
import { AdminUserDeleteComponent } from './admin/user/delete/admin-user-delete.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/category/admin-category.component';
import { AdminCategoryAddComponent } from './admin/category/add/admin-category-add.component';

import { AppUserComponent } from './app-user.component';
import { AppAdminComponent } from './app-admin.component';

import { AuthenticatedGuard } from './common/authenticated.guard';
import { UserService } from './common/services/user.service';
import { AdminGuard } from './common/admin.guard';
import { PreventLoggedInAccess } from './common/prevent-logged-in-access';

import { AdComponent } from './ad/ad.component';
import { AdAddComponent } from './ad/add/add.component';
import { AdDeleteComponent } from './ad/delete/delete.component';
import { AdEditComponent } from './ad/edit/edit.component';
import { AdIndexComponent } from './ad/index/index.component';
import { AdShowComponent } from './ad/show/show.component';
import { AdChangeStatusComponent } from './ad/change-status/change-status.component';
import { CategoryService } from './common/services/category.service';
import { AdminService } from './common/services/admin.service';
import { PermissionService } from './common/services/permission.service';
import { AdService } from './common/services/ad.service';
import { AdminPermissionComponent } from "./admin/permission/admin-permission.component";
import { AdminPermissionIndexComponent } from './admin/permission/admin-permission-index/admin-permission-index.component';
import { AdminPermissionShowComponent } from './admin/permission/admin-permission-show/admin-permission-show.component';
import { AdminPermissionAddComponent } from './admin/permission/admin-permission-add/admin-permission-add.component';
import { AdminPermissionEditComponent } from './admin/permission/admin-permission-edit/admin-permission-edit.component';
import { AdminActionComponent } from './admin/action/action.component';
import { ActionService } from './common/services/action.service';
import { AdminAdComponent } from './admin/ad/admin-ad.component';
import { AdminAdService } from './common/services/admin.ad.service';

const routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: UserLoginComponent, canActivate: [PreventLoggedInAccess]},
  {path: 'logout', component: UserLogoutComponent, canActivate: [AuthenticatedGuard]},
  {path: 'register', component: UserRegisterComponent},
  {path: 'resend-email', component: UserResendEmailComponent },
  {path: 'user', component: AppUserComponent, canActivate: [AuthenticatedGuard], children: [
    {path: '', component: HomeComponent},
    {path: 'me', component: UserInfoComponent},
    {path: 'change-password', component: UserChangePasswordComponent}
  ]},
  {path: 'admin', component: AppAdminComponent, canActivate: [AdminGuard], children: [
    {path: '', component: AdminComponent},
    {path: 'permission', component: AdminPermissionIndexComponent, children: [
      {path: 'add', component: AdminPermissionAddComponent},
      {path: ':id/edit', component: AdminPermissionEditComponent},
      {path: ':id', component: AdminPermissionShowComponent}
    ]},
    {path: 'category', component: AdminCategoryComponent, canActivate: [AdminGuard], children: [
        {path: 'create', component: AdminCategoryAddComponent},
    ]},
    {path: 'actions', component: AdminActionComponent},
    {path: 'ads', component: AdminAdComponent}
  ]},
  {path: 'ad', component: AppUserComponent, canActivate: [AuthenticatedGuard], children: [
    {path: '', component: AdComponent, pathMath: 'full'},
    {path: 'add', component: AdAddComponent},
    {path: ':id', component: AdShowComponent},
    {path: ':id/edit', component: AdEditComponent},
    {path: ':id/delete', component: AdDeleteComponent},
    {path: ':id/show', component: AdShowComponent},
    {path: ':id/status', component: AdChangeStatusComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    HomeComponent,
    UserRegisterComponent,
    UserLogoutComponent,
    UserInfoComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminCategoryAddComponent,
    UserChangePasswordComponent,
    UserResendEmailComponent,
    AdminUserComponent,
    AdminUserDeleteComponent,
    AppUserComponent,
    AppAdminComponent,
    AdComponent,
    AdAddComponent,
    AdDeleteComponent,
    AdEditComponent,
    AdIndexComponent,
    AdShowComponent,
    AdChangeStatusComponent,
    AdminPermissionIndexComponent,
    AdminPermissionShowComponent,
    AdminPermissionAddComponent,
    AdminPermissionEditComponent,
    AdminPermissionComponent,
    AdminActionComponent,
    AdminAdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    CategoryService,
    AdminService,
    AdService,
    ActionService,
    AdminAdService,
    PermissionService,
    AuthenticatedGuard,
    AdminGuard,
    PreventLoggedInAccess,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
