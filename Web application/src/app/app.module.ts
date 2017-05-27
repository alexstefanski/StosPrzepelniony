import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { UserComponent } from './admin/user/user.component';
import { IndexComponent } from './admin/category/index/index.component';
import { AddComponent } from './admin/category/add/add.component';
import { EditComponent } from './admin/category/edit/edit.component';
import { DeleteComponent } from './admin/category/delete/delete.component';
import { AppUserComponent } from './app-user.component';
import { AppAdminComponent } from './app-admin.component';

import { AuthenticatedGuard } from './common/authenticated.guard';
import { UserService } from './common/user.service';
import { AdminGuard } from './common/admin.guard';
import { PreventLoggedInAccess } from './common/prevent-logged-in-access';

const routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: UserLoginComponent, canActivate: [PreventLoggedInAccess]},
  {path: 'logout', component: UserLogoutComponent, canActivate: [AuthenticatedGuard, AdminGuard]},
  {path: 'register', component: UserRegisterComponent},
  {path: 'user', component: AppUserComponent, canActivate: [AuthenticatedGuard], children: [
    {path: '', component: HomeComponent},
    {path: 'me', component: UserInfoComponent},
    {path: 'change-password', component: UserChangePasswordComponent}
  ]},
  {path: 'admin', component: AppAdminComponent, canActivate: [AdminGuard], children: [
    {path: '', component: AddComponent}
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
    CategoryComponent,
    UserComponent,
    IndexComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    UserChangePasswordComponent,
    UserResendEmailComponent,
    AppUserComponent,
    AppAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    AuthenticatedGuard,
    AdminGuard,
    PreventLoggedInAccess
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
