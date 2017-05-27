import { Injectable , } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { User } from './user';
import { isUserLogged , isUserAdmin } from '../api';


@Injectable()
export class UserService {
    currentUser: User;

    constructor(private http: Http) {
        this.currentUser = new User();
        this.refreshUserInfo();
    }

    private refreshUserInfo() {
        this.currentUser.id = window.localStorage.getItem('userId');
        this.currentUser.name = window.localStorage.getItem('userName');
        this.currentUser.sessionToken = window.localStorage.getItem('sessionToken');
    }

    isAuthenticated(): Observable<boolean> {
        this.refreshUserInfo();
        if (this.currentUser.id != null && this.currentUser.name != null && this.currentUser.sessionToken != null) {
            const headers = this.getAuthenticatedHeader();

            return this.http.get(isUserLogged, {headers: headers})
                .map((response) => {
                    if (response.status === 204) {
                        return true;
                    } else {
                        return false;
                    }
                });
        } else {
            return Observable.of(false);
        }
    }

    getAuthenticatedHeader(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(this.currentUser.id + ':' + this.currentUser.sessionToken));

        return headers;
    }

    isAdmin(): Observable<boolean> {
        this.refreshUserInfo();
        if (this.currentUser.id != null && this.currentUser.name != null && this.currentUser.sessionToken != null) {
            const headers = this.getAuthenticatedHeader();

            return this.http.get(isUserAdmin(this.currentUser.id), {headers: headers})
                .map((response) => {
                    if (response.status === 204) {
                        return true;
                    } else {
                        return false;
                    }
                });
        } else {
            return Observable.of(false);
        }
    }
}
