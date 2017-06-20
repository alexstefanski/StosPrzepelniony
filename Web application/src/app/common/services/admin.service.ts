import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import {adminDelete, adminPermissionEdit, adminsList} from '../../api';
import { UserService } from './user.service';
import { Admin } from '../models/admin';
import { Permission } from '../models/permission';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {
    private adminAvailableSource = new Subject();
    adminAvailable$ = this.adminAvailableSource.asObservable();
    constructor(private http: Http, private userService: UserService) { }

    getAllAdmins(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminsList, {headers: headers})
            .toPromise()
            .then((response) => {
                const adminsArray = new Array<Admin>();
                response.json().forEach((admin) => {
                    const adm = new Admin();
                    adm.id = admin.adminId;
                    adm.userId = admin.user.userId;
                    adm.firstName = admin.user.firstName;
                    adm.lastName = admin.user.lastName;

                    const perm = new Permission();
                    perm.id = admin.permission.permissionId;
                    perm.name = admin.permission.name;

                    adm.permission = perm;

                    adminsArray.push(adm);
                });

                callback(null, adminsArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    postEditAdminPermission(admin: Admin, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        const payload = {
            adminId: admin.id,
            permissionId: admin.permission.id
        };

        this.http.post(adminPermissionEdit(admin.id), payload, {headers: headers})
            .toPromise()
            .then((response) => {
                this.adminAvailableSource.next();
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            })
    }

    deleteAdmin(admin: Admin, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.delete(adminDelete(admin.id), {headers: headers})
            .toPromise()
            .then((response) => {
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            })
    }

}