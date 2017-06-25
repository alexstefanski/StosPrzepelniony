import { Component, OnInit } from '@angular/core';
import { Permission } from "../../../common/models/permission";
import { PermissionService } from "../../../common/services/permission.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Action } from "../../../common/models/action";
import {ActionService} from "app/common/services/action.service";

@Component({
  selector: 'app-admin-permission-edit',
  templateUrl: './admin-permission-edit.component.html',
  styleUrls: ['./admin-permission-edit.component.css']
})
export class AdminPermissionEditComponent implements OnInit {
  permission: Permission;
  permissionId: number;
  editForm: FormGroup;
  actionList: Array<Action>;

  constructor(private permissionService: PermissionService,
              private ar: ActivatedRoute,
              private formBuilder: FormBuilder,
              private actionService: ActionService,
              private router: Router) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.permissionId = +params['id'];
        this.actionService.getAllActions((errors, actionsArray) => {
          if (errors === null){
            this.actionList = actionsArray;
          } else {
            console.log(errors);
          }
        });
        this.permissionService.getPermissionById(this.permissionId, (errors, permission) => {
          if (!errors) {
            console.log(permission);
            this.permission = permission;
            this.editForm.controls['name'].setValue(permission.name);
          } else {
            console.log(errors);
          }
        });

        //this.actionList.forEach(items => {
          //this.editForm.addControl('action' + items.id, new FormControl(this.permission.actions.indexOf(items.id) > 0))
        //});
      } else {
        console.log('Wrong param!');
      }
    });
  }

  userHasAction(action: Action) {
    return false;
    //return (this.permission.actions.indexOf(action) > 0);
  }

  onSubmit() {
    this.router.navigate(['/admin/permission'])
  }
}
