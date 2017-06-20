import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { adminPermissionsList } from '../../api';
import { UserService } from './user.service';
import { Permission } from '../models/permission';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PermissionService {
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

}