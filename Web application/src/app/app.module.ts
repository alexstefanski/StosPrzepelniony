import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule } from 'angular2-notifications';
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

import { AdminComponent } from './admin/admin.component';
import {AdminAddComponent} from './admin/admin-add/admin-add.component';
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
import {AdminUserService} from "./common/services/admin.user.service";
import { UserConfirmRegisterComponent } from './user/confirm-register/user-confirm-register.component';
import { UserResetPasswordComponent } from './user/reset-password/user-reset-password.component';
import { UserSetNewPasswordComponent } from './user/set-new-password/user-set-new-password.component';

import { AdCategoryFilterPipe } from './common/pipes/ad-category-filter.pipe';
import { AdSearchPipe } from './common/pipes/ad-search.pipe';
import { AdCostFilterPipe } from './common/pipes/ad-cost-filter.pipe';
import { MessageComponent } from './message/message.component';
import { MessageService } from './common/services/message.service';

const routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: UserLoginComponent, canActivate: [PreventLoggedInAccess]},
  {path: 'logout', component: UserLogoutComponent, canActivate: [AuthenticatedGuard]},
  {path: 'register', component: UserRegisterComponent},
  {path: 'resend-email', component: UserResendEmailComponent},
  {path: 'forgot-password', component: UserResetPasswordComponent },
  {path: 'confirm-register/:userId/:tokenId/:token', component: UserConfirmRegisterComponent},
  {path: 'set-new-password/:userId/:tokenId/:token', component: UserSetNewPasswordComponent },
  {path: 'user', component: AppUserComponent, canActivate: [AuthenticatedGuard], children: [
    {path: '', component: HomeComponent},
    {path: 'me', component: UserInfoComponent},
    {path: 'change-password', component: UserChangePasswordComponent},
    {path: 'messages', component: MessageComponent}

  ]},
  {path: 'admin', component: AppAdminComponent, canActivate: [AdminGuard], children: [
    {path: '', component: AdminComponent, children:[
      {path: 'add', component: AdminAddComponent}
    ]},
    {path: 'permission', children: [
      {path: '', component: AdminPermissionIndexComponent},
      {path: 'add', component: AdminPermissionAddComponent},
      {path: ':id/edit', component: AdminPermissionEditComponent},
      {path: ':id', component: AdminPermissionShowComponent}
    ]},
    {path: 'user', component: AdminUserComponent, canActivate: [AdminGuard]},
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
    AdminAddComponent,
    AdminCategoryComponent,
    AdminCategoryAddComponent,
    UserChangePasswordComponent,
    UserResendEmailComponent,
    AdminUserComponent,
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
    AdminAdComponent,
    UserConfirmRegisterComponent,
    UserResetPasswordComponent,
    UserSetNewPasswordComponent,
    AdCategoryFilterPipe,
    AdSearchPipe,
    AdCostFilterPipe,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    CategoryService,
    AdminService,
    AdminUserService,
    AdService,
    ActionService,
    AdminAdService,
    PermissionService,
    AuthenticatedGuard,
    AdminGuard,
    PreventLoggedInAccess,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
