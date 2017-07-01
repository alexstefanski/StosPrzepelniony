import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import { PermissionService } from "../../../common/services/permission.service";
import { Router } from "@angular/router";
import {isNullOrUndefined} from "util";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-permission-add',
  templateUrl: './admin-permission-add.component.html',
  styleUrls: ['./admin-permission-add.component.css']
})
export class AdminPermissionAddComponent implements OnInit {
  private addForm: FormGroup;
  private message: string = null;
  constructor(private formBuilder: FormBuilder,
              private notificationsService: NotificationsService,
              private permissionService: PermissionService,
              private router: Router) {

    this.addForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let permission = {
      name: this.addForm.controls['name'].value,
      actions: []
    };
    this.permissionService.addPermission(permission, (error, response) => {
      if (!error) {
        if (response.status === 201) {
          this.notificationsService.success('Pomyślnie dodano nowy dostęp');
          this.router.navigate(['admin/permission']);
        }
      } else {
        let errorTitle = '';
        let errorMsg = '';

        if (error.status === 406) {
          errorTitle += isNullOrUndefined(error.json().message) === false ? error.json().message + '\n' : 'Niepowodzenie';
          errorMsg += isNullOrUndefined(error.json().name) === false ? error.json().name : '';
          this.notificationsService.alert(errorTitle, errorMsg);

        } else if (error.status === 422) {
          this.notificationsService.error('Niepowodzenie', error.json().messages);
        } else {
          this.notificationsService.error('Niepowodzenie');
        }
      }
    });
  }
}
