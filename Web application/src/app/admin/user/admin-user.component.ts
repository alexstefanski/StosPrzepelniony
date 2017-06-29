import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../common/services/admin.user.service';
import { AdminUser } from '../../common/models/admin-user';
import { Router } from '@angular/router';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: Array<AdminUser>;
  message: string;

  constructor(private adminUserService: AdminUserService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.prepareUsersList();
    this.adminUserService.userAvailable$.subscribe(
      () => this.prepareUsersList()
    );
  }

  prepareUsersList() {
    this.adminUserService.getAllUsers((errors, users) => {
      if (!errors) {
        this.users = users.sort((a,b) => this.sortUsersById(a,b));
      }
    });
  }

  deleteUser(user) {
    this.adminUserService.postDeleteUser(user.userId, (errors, response) => {
      if (errors) {
        if (errors.status === 403) {
          this.notificationsService.error('Niepowodzenia', errors.json().userId);
        }
      } else {
        this.notificationsService.success('Pomyślnie usunięto użytkownia');
      }
    });
  }

  sortUsersById(a, b) {
    if (a.userId < b.userId) {
      return -1;
    }
    if (a.userId > b.userId) {
      return 1;
    }

    return 0;
  }

}
