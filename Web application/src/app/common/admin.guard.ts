import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate() {
        return this.userService.isAdmin().do((res) => {
           if (!res) {
               this.router.navigate(['user']);
           }
        });
    }

}
