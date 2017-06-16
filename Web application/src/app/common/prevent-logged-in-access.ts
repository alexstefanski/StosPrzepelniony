import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { UserService } from './services/user.service';

import 'rxjs/add/operator/do';

@Injectable()
export class PreventLoggedInAccess implements CanActivate {
    constructor(private router: Router, private userService: UserService) {}

    canActivate() {
        return this.userService.isAuthenticated().map((res) => !res).do((res) => {
            if (!res) {
                this.router.navigate(['user']);
            }
        });
    }

}
