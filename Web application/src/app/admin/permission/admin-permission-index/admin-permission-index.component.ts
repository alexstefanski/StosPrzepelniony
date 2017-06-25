import { Component, OnInit } from '@angular/core';
import { PermissionService } from "../../../common/services/permission.service";
import { Permission } from "../../../common/models/permission";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-permission-index',
  templateUrl: './admin-permission-index.component.html',
  styleUrls: ['./admin-permission-index.component.css']
})
export class AdminPermissionIndexComponent implements OnInit {
  permissionArray = new Array<Permission>();

  constructor(private permissionService: PermissionService, private router: Router) { }

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
        console.log(errors);
      }
    });

  }

  onDelete(permissionId) {
    this.permissionService.deletePermission(permissionId, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
          this.router.navigate(['/admin/permission'])
        }
      } else {
        console.log(errors);
      }
    });

  }

}
