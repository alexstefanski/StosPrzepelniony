import { Component, OnInit } from '@angular/core';
import { Admin } from '../common/models/admin';
import { AdminService } from '../common/services/admin.service';
import { PermissionService } from '../common/services/permission.service';
import { Permission } from '../common/models/permission';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminsList: Array<Admin>;
  permissionsList: Array<Permission>;
  messages: string = null;
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
        this.messages = 'Nie można pobrać listy administratorów';
      }
    })
  }

  preparePermissionsList(admin: Admin): void {
    this.permissionService.getAllPermissions((errors, permissionsArray) => {
      if (!errors) {
        this.newAdminPermissionId = admin.permission.id;
        this.permissionsList = permissionsArray;
        admin.edited = true;
      }
    })
  }

  handleEdit(admin: Admin) {
    this.handlingEditing = true;
    this.preparePermissionsList(admin);
  }

  editPermission(admin: Admin) {
    if (admin.permission.id == this.newAdminPermissionId) {
      return;
    }

    admin.permission.id = this.newAdminPermissionId;
    this.adminService.postEditAdminPermission(admin, (errors, response) => {
      if (errors === null) {
        if (response.status === 201) {
          this.notificationsService.success('Pomyślnie edytowano', ' ');
          this.handlingEditing = false;
        }
        this.newAdminPermissionId = null;
      } else {
        console.log(errors.json());
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
        }
      }
    })
  }
}
