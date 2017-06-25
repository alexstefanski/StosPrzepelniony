import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import { adminActionsList } from '../../api';
import { UserService } from './user.service';
import { Action } from '../models/action';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActionService {
    constructor(private http: Http, private userService: UserService) { }

    getAllActions(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminActionsList, {headers: headers})
            .toPromise()
            .then((response) => {
                const actionsArray = new Array<Action>();
                response.json().forEach((item) => {
                    const action = new Action();
                    action.id = item.id;
                    action.name = item.name;
                    action.description = item.description;

                    actionsArray.push(action);
                });

                callback(null, actionsArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

}
