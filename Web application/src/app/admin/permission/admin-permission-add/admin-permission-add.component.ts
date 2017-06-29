import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import { PermissionService } from "../../../common/services/permission.service";
import { Router } from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-admin-permission-add',
  templateUrl: './admin-permission-add.component.html',
  styleUrls: ['./admin-permission-add.component.css']
})
export class AdminPermissionAddComponent implements OnInit {
  private addForm: FormGroup;
  private message: string = null;
  constructor(private formBuilder: FormBuilder,
              private http: Http,
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
          this.router.navigate(['admin/permission']);
        }
      } else {
        let errorMsg = '';

        if (error.status === 406) {
          errorMsg += isNullOrUndefined(error.json().message) === false ? error.json().message + '\n' : '';
          errorMsg += isNullOrUndefined(error.json().name) === false ? error.json().name : '';

          alert(errorMsg);
        }
      }
    });
  }
}
