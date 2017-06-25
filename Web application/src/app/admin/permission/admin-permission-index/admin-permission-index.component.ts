import { Component, OnInit } from '@angular/core';
import { PermissionService } from "../../../common/services/permission.service";
import { Permission } from "../../../common/models/permission";

@Component({
  selector: 'app-admin-permission-index',
  templateUrl: './admin-permission-index.component.html',
  styleUrls: ['./admin-permission-index.component.css']
})
export class AdminPermissionIndexComponent implements OnInit {
  permissionArray = new Array<Permission>();

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.permissionService.getAllPermissions(result => {
      this.permissionService.getAllPermissions((errors, permissionsArray) => {
        this.permissionArray = permissionsArray;
      });
    });

    //this.preparePermissionList();
    //this.permissionService.permissionAvailable$.subscribe();
  }

  preparePermissionList() {
    this.permissionService.getAllPermissions(result => {
      this.permissionService.getAllPermissions((errors, permissionsArray) => {
        this.permissionArray = permissionsArray;
      });
    });
  }

  onDelete() {}

}