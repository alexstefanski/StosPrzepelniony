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
  p: number = 1;
  users: Array<AdminUser>;
  messages: string = '';
  newUserStatus: number;
  handlingEditing: boolean = false;
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
      } else {
        this.users = null;
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
          this.messages = errors.json().messages;
        }
      }
    });
  }

  deleteUser(user) {
    this.adminUserService.postDeleteUser(user.userId, (errors, response) => {
      if (errors) {
        if (errors.status === 403) {
          this.notificationsService.error('Niepowodzenia', errors.json().userId);
        } else if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          this.notificationsService.error('Niepowodzenie');
        }
      } else {
        this.notificationsService.success('Pomyślnie usunięto użytkownia');
      }
    });
  }

  handleEdit(adminUser: AdminUser) {
    this.handlingEditing = true;
    adminUser.edited = true;
    this.newUserStatus = adminUser.status;
  }

  editUserStatus(adminUser: AdminUser) {
    if (adminUser.status === this.newUserStatus) {
      this.notificationsService.alert('Zmień status na inny bądź kliknij anuluj');
      return;
    }

    const payload = {
      status: this.newUserStatus
    };

    this.adminUserService.postEditUserStatus(adminUser.userId, payload, (errors, response) => {
      if (errors === null) {
       if (response.status === 204) {
         this.notificationsService.success('Pomyślnie edytowano status użytownika');
         adminUser.statusName = '';
         adminUser.status = this.newUserStatus;
         this.handlingEditing = false;
         adminUser.edited = false;
       }
      } else {
        if (errors.status === 403 || errors.status === 404) {
          this.notificationsService.alert(errors.json().message, errors.json().userId);
        } else if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          this.notificationsService.error('Niepowodzenie');
        }
      }
    });
  }

  cancel(adminUser: AdminUser) {
    this.handlingEditing = false;
    adminUser.edited = false;
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
