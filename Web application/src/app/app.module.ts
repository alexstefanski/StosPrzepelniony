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
import { AdminCategoryEditComponent } from './admin/category/edit/admin-category-edit.component';
import { AdminCategoryDeleteComponent } from './admin/category/delete/admin-category-delete.component';

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
    {path: 'category', component: AdminCategoryComponent, canActivate: [AdminGuard], children: [
        {path: 'create', component: AdminCategoryAddComponent},
        {path: 'edit', component: AdminCategoryEditComponent},
        {path: 'delete', component: AdminCategoryDeleteComponent}
      ]}
  ]},
  {path: 'ad', canActivate: [AuthenticatedGuard], children: [
    {path: '', component: AdComponent, pathMath: 'full'},
    {path: 'add', component: AdAddComponent},
    {path: ':id', component: AdShowComponent},
    {path: ':id/edit', component: AdEditComponent},
    {path: ':id/delete', component: AdDeleteComponent},
    {path: ':id/show', component: AdShowComponent}
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
    AdminCategoryEditComponent,
    AdminCategoryDeleteComponent,
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
    AdChangeStatusComponent
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
    AuthenticatedGuard,
    AdminGuard,
    PreventLoggedInAccess,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
