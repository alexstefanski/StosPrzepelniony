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

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { UserComponent } from './admin/user/user.component';
import { IndexComponent } from './admin/category/index/index.component';
import { AddComponent } from './admin/category/add/add.component';
import { EditComponent } from './admin/category/edit/edit.component';
import { DeleteComponent } from './admin/category/delete/delete.component';


const routes = [
  {path: '', component: HomeComponent},

  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'logout', component: UserLogoutComponent},
  {path: 'me', component: UserInfoComponent},
  {path: 'change-password', component: UserChangePasswordComponent}
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
