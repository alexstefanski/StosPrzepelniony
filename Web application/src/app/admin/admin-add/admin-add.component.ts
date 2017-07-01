import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Admin } from '../../common/models/admin';
import { Permission } from '../../common/models/permission';
import { AdminService } from '../../common/services/admin.service';
import { PermissionService } from '../../common/services/permission.service';
import { NotificationsService } from "angular2-notifications/dist";
import {isNullOrUndefined} from "util";

import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {
admin: Admin = new Admin();
permissionArray = new Array<Permission>();
message: string = null;

  constructor(private adminService: AdminService,
              private permissionService: PermissionService,
              private router: Router,
              private notificationsService: NotificationsService) {
   }

  ngOnInit() {
    this.preparePermissionList();
    this.permissionService.permissionAvailable$.subscribe(
        () => this.preparePermissionList()
    );
  }

  onSubmit() {
    this.adminService.postAddAdmin(this.admin, (errors, response) => {
      if (errors.status === 406) {
         this.notificationsService.alert(errors.json().message, errors.json().userId)
      } else {
        this.notificationsService.success('Pomyślnie dodano administratora');
        this.router.navigate(['admin/']);
        }
      }
    )
  }
  
  preparePermissionList() {
    this.permissionService.getAllPermissions((errors, permissionsArray) => {
      if (errors === null) {
        this.permissionArray = permissionsArray;
      } else {
        this.permissionArray = null;
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().message);
          this.message = errors.json().messages;
        }
      }
    });
  }

}
