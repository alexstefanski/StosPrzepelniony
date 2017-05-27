import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { UserService } from './common/user.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {
  isAdminLogged: Observable<boolean>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isAdminLogged = this.userService.isAdmin();
  }

}
