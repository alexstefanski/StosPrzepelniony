import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { logOutUser } from './../../api';
import { UserService } from 'app/common/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
    providers: [UserService]
})
export class UserLogoutComponent implements OnInit {

  constructor(private userService: UserService, private http: Http, private router: Router) { }

  ngOnInit() {
      const headers = this.userService.getAuthenticatedHeader();

      this.http.post(logOutUser, {}, {headers: headers})
          .subscribe((response) => {
              if (response.status === 204) {
                  window.localStorage.removeItem('userId');
                  window.localStorage.removeItem('userName');
                  window.localStorage.removeItem('sessionToken');

                  this.router.navigate(['']);
              } else {
                  console.log('cos poszlo nie tak');
              }
          });
  }
}
