import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { logOutUser } from './../../api';

@Component({
  selector: 'app-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {

    if(window.localStorage.getItem('userId') != null && window.localStorage.getItem('sessionToken') != null && window.localStorage.getItem('userName') != null) {

      let userId = window.localStorage.getItem('userId')
      let sessionToken = window.localStorage.getItem('sessionToken')

      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + btoa(userId + ':' + sessionToken))

      this.http.post(logOutUser, {}, { headers: headers})
        .toPromise()
        .then(response => {

          window.localStorage.removeItem('userId')
          window.localStorage.removeItem('sessionToken')
          window.localStorage.removeItem('userName')

          this.router.navigate([''])
        })
    }
  }

}
