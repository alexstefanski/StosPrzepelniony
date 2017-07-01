import { Component, OnInit } from '@angular/core';
import { Admin } from '../common/models/admin';
import { AdminService } from '../common/services/admin.service';
import { PermissionService } from '../common/services/permission.service';
import { Permission } from '../common/models/permission';
import {NotificationsService} from "angular2-notifications/dist";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  p: number = 1;
  adminsList: Array<Admin>;
  permissionsList: Array<Permission>;
  messages: string = '';
  newAdminPermissionId: number;
  handlingEditing: boolean = false;
  constructor(private adminService: AdminService,
              private permissionService: PermissionService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.prepareAdminsList();
    this.adminService.adminAvailable$.subscribe(
        () => this.prepareAdminsList()
    );
  }

  prepareAdminsList(): void {
    this.adminService.getAllAdmins((errors, adminsArray) => {
      if (!errors) {
        this.adminsList = adminsArray;
      } else {
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
          this.messages = errors.json().messages;
          this.adminsList = null;
        }
      }
    })
  }

  preparePermissionsList(admin: Admin): void {
    this.permissionService.getAllPermissions((errors, permissionsArray) => {
      if (!errors) {
        this.newAdminPermissionId = admin.permission.id;
        this.permissionsList = permissionsArray;
        admin.edited = true;
      } else {
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        }
        this.handlingEditing = false;
      }
    })
  }

  handleEdit(admin: Admin) {
    this.handlingEditing = true;
    this.preparePermissionsList(admin);
  }

  editPermission(admin: Admin) {
    if (admin.permission.id == this.newAdminPermissionId) {
      this.notificationsService.alert('Zmień rodzaj uprawnienia na inny bądź kliknij anuluj');
      return;
    }

    admin.permission.id = this.newAdminPermissionId;
    this.adminService.postEditAdminPermission(admin, (errors, response) => {
      if (errors === null) {
        if (response.status === 201) {
          this.notificationsService.success('Pomyślnie edytowano', ' ');
        }
        this.handlingEditing = false;
        this.newAdminPermissionId = null;
      } else {
        if (errors.status === 403) {
          this.notificationsService.alert(errors.json().message, errors.json().adminId);
        } else if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        }
      }
    });

  }

  handleCancel(admin: Admin) {
    admin.edited = false;
    this.handlingEditing = false;
  }
  

  deleteAdmin(admin: Admin) {
    this.adminService.deleteAdmin(admin, (errors, response) => {
      if (errors) {
        if (errors.status === 403) {
          this.notificationsService.alert(errors.json().message, errors.json().adminId);
        } else if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        }
      } else {
        this.notificationsService.success('Pomyślnie usunięto: ' + admin.permission.name);
      }
    })
  }
}
