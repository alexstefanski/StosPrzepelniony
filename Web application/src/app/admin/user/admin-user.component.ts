import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../common/services/admin.user.service';
import { AdminUser } from '../../common/models/admin-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: Array<AdminUser>;
  message: string;

  constructor(private adminUserService: AdminUserService, private router: Router) { }

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
          alert(errors.json().message + '\n' + errors.json().userId);
        }
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
