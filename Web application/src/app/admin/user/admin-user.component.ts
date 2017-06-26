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
        this.message = errors.message.join(' ');
      }
    });
  }

  sortUsersById(a, b) {
    if (a.categoryId < b.categoryId) {
      return -1;
    }
    if (a.categoryId > b.categoryId) {
      return 1;
    }

    return 0;
  }

}
