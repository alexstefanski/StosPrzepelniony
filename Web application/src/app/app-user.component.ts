import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './common/services/user.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {
  isAdminLogged: boolean = false;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.isAdmin().subscribe(res => this.isAdminLogged = res);
  }
}
