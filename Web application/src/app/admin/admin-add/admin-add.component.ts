import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Admin } from '../../common/models/admin';
import { Permission } from '../../common/models/permission';
import { AdminService } from '../../common/services/admin.service';

import 'rxjs/add/operator/toPromise';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {
admin: Admin = new Admin();
message: string = null;

  constructor(private adminService: AdminService, private router: Router, private notificationsService: NotificationsService) {
   }

  ngOnInit() {
  }

  onSubmit() {
    this.adminService.postAddAdmin(this.admin, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
         this.router.navigate(['admin/']);
        }
      } else {
        this.message = errors.messages.join(' ');
      }
    })
  }

}
