import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { userInfo } from './../../api'

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  firstName: string = null;
  lastName: string = null;
  email: string = null;

  userId: string = window.localStorage.getItem('userId');
  sessionToken: string = window.localStorage.getItem('sessionToken');

  constructor(private http: Http) { }

  ngOnInit() {

    if(window.localStorage.getItem('userId') != null && window.localStorage.getItem('sessionToken') != null && window.localStorage.getItem('userName') != null) {

      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + btoa(this.userId + ':' + this.sessionToken))

      this.http.get(userInfo(+this.userId), {headers: headers})
        .toPromise()
        .then(response => {
          this.firstName = response.json().firstName
          this.lastName = response.json().lastName
          this.email = response.json().email
        })
        .catch(response => {
          console.log(response)
        })
    }
  }

}
