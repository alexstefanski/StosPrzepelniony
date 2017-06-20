import { Component, OnInit } from '@angular/core';
import {UserService} from "./common/services/user.service";
import {User} from "./common/models/user";

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.css']
})
export class AppAdminComponent implements OnInit {
  currentAdmin: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentAdmin = this.userService.currentUser;
  }

}
