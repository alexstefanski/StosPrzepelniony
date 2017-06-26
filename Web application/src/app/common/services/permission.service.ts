import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    adminPermissionsList, adminPermissionShow, adminPermissionAdd, adminPermissionDelete,
    adminPermissionEdit
} from '../../api';
import { UserService } from './user.service';
import { Permission } from '../models/permission';

import 'rxjs/add/operator/toPromise';
import { Subject } from "rxjs/Subject";

@Injectable()
export class PermissionService {
  private permissionAvailableSource = new Subject();
  permissionAvailable$ = this.permissionAvailableSource.asObservable();

  constructor(private http: Http, private userService: UserService) { }

    getAllPermissions(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminPermissionsList, {headers: headers})
            .toPromise()
            .then((response) => {
                const permissionsArray = new Array<Permission>();
                response.json().forEach((permission) => {
                    const perm = new Permission();
                    perm.id = permission.permissionId;
                    perm.name = permission.name;

                    permissionsArray.push(perm);
                });

                callback(null, permissionsArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

  addPermission(permission, callback) {
    const headers = this.userService.getAuthenticatedHeader();
    this.http.post(adminPermissionAdd, permission, {headers: headers})
      .toPromise()
      .then((response) => {
        this.permissionAvailableSource.next();
        callback(null, response);
      })
      .catch((errors) => {
        callback(errors, null);
      });
  }

  deletePermission(permissionId, callback) {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.delete(adminPermissionDelete(permissionId), {headers: headers})
      .toPromise()
      .then((response) => {
        this.permissionAvailableSource.next();
        callback(null, response);
      })
      .catch((errors) => {
        callback(errors, null);
      });
  }

  getPermissionById(permissionId, callback) {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.get(adminPermissionShow(permissionId), {headers: headers}).toPromise()
      .then(response => {
        let ad = {
          permissionId: response.json().id,
          name: response.json().name,
          actions: response.json().actions
        };
        callback(null, ad);
      }).catch(errors => {
        callback(errors, null);
    });
  }

  postEditPermission(permissionId, payload, callback) {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.post(adminPermissionEdit(permissionId), payload, {headers: headers})
        .toPromise()
        .then((response) => {
            callback(null, response);
        })
        .catch((errors) => {
            callback(errors, null);
        })
  }
}
