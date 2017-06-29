import { Component, OnInit } from '@angular/core';
import { Permission } from "../../../common/models/permission";
import { PermissionService } from "../../../common/services/permission.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Action } from "../../../common/models/action";
import { ActionService } from "app/common/services/action.service";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-permission-edit',
  templateUrl: './admin-permission-edit.component.html',
  styleUrls: ['./admin-permission-edit.component.css']
})
export class AdminPermissionEditComponent implements OnInit {
  permission: Permission = new Permission();
  actionList: Array<Action> = new Array<Action>();

  constructor(private permissionService: PermissionService,
              private ar: ActivatedRoute,
              private actionService: ActionService,
              private router: Router,
              private notificationsService: NotificationsService) {
    ar.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.permission.id = +params['id'];
      } else {
        this.router.navigate(['admin/permission']);
      }
    });
    this.permission.name = '';
  }

  ngOnInit() {
    this.actionService.getAllActions((errors, actionsArray) => {
      if (errors === null){
        this.actionList = actionsArray;

        this.permissionService.getPermissionById(this.permission.id, (errors, permission) => {
          if (errors === null) {
            this.permission = permission;

            this.actionList.forEach(act => {
              if (this.permission.actions.find(i => i.id === act.id)) {
                act.checked = true;
              } else {
                act.checked = false;
              }
            })
          } else {
            console.log(errors.json());
          }
        });
      } else {
        console.log(errors);
      }
    });

  }

  onSubmit() {
    let actions: number[] = [];

    this.actionList.forEach(act => {
      if (act.checked) {
        actions.push(act.id);
      }
    });

    let payload = {
      name: this.permission.name,
      actions: actions
    };

    this.permissionService.postEditPermission(this.permission.id, payload, (errors, result) => {
      if (errors === null) {
        if (result.status === 201) {
          if (!isNullOrUndefined(result.json().messages)) {
            this.notificationsService.success(result.json().messages);
          }
          this.router.navigate(['admin/permission']);
        }
      } else {
        console.log(errors);
      }
    });
  }

}
