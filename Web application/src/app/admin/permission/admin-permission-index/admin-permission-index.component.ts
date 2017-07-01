import { Component, OnInit } from '@angular/core';
import { PermissionService } from "../../../common/services/permission.service";
import { Permission } from "../../../common/models/permission";
import { Router } from "@angular/router";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-permission-index',
  templateUrl: './admin-permission-index.component.html',
  styleUrls: ['./admin-permission-index.component.css']
})
export class AdminPermissionIndexComponent implements OnInit {
  p: number = 1;
  permissionArray = new Array<Permission>();
  messages: string = '';
  constructor(private permissionService: PermissionService,
              private router: Router,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.preparePermissionList();
    this.permissionService.permissionAvailable$.subscribe(
        () => this.preparePermissionList()
    );
  }

  preparePermissionList() {
    this.permissionService.getAllPermissions((errors, permissionsArray) => {
      if (errors === null) {
        this.permissionArray = permissionsArray;
      } else {
        this.permissionArray = null;
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
          this.messages = errors.json().messages;
        }
      }
    });
  }

  onDelete(permissionId) {
    this.permissionService.deletePermission(permissionId, (errors, response) => {
      if (!errors) {
        if (response.status === 201) {
          this.notificationsService.success('Pomyślnie usunięto');
          this.router.navigate(['/admin/permission'])
        }
      } else {
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else if (!isNullOrUndefined(errors.json().messages)) {
          let errorTitle = errors.json().messages ;
          let errorMsg = isNullOrUndefined(errors.json().permissionId) === false ? errors.json().permissionId : '';
          this.notificationsService.error(errorTitle, errorMsg);
        }
      }
    });

  }

}
