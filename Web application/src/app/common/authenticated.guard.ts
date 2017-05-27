import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { UserService } from './user.service';

import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {}

    canActivate() {
        return this.userService.isAuthenticated().do((res) => {
            if (!res) {
                this.router.navigate(['login']);
            }
        });
    }

}
