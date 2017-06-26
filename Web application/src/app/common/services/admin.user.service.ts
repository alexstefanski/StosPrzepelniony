import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import { adminUser, adminUserDelete} from '../../api';
import { UserService } from './user.service';
import { AdminUser } from '../models/admin-user';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AdminUserService {
  private userAvailableSource = new Subject();
  userAvailable$ = this.userAvailableSource.asObservable();

  constructor(private http: Http, private userService: UserService) { }

  getAllUsers(callback) {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.get(adminUser, {headers: headers})
      .toPromise()
      .then((response) => {
        const userArray = new Array<AdminUser>();
        response.json().forEach((user) => {
          const usr = new AdminUser();
          usr.userId = user.userId;
          usr.firstName = user.firstName;
          usr.lastName = user.lastName;
          usr.email = user.email;
          usr.status = user.status;
          userArray.push(usr);
        });

        callback(null, userArray);
      })
      .catch((errors) => {
        callback(errors, null);
      });
  }

  postDeleteUser(userId, callback) {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.delete(adminUserDelete(userId), {headers: headers})
      .toPromise()
      .then((response) => {
        this.userAvailableSource.next();
        callback(null, response);
      })
      .catch((errors) => {
        callback(errors, null);
      });
  }

}
