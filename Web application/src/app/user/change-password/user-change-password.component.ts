import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { changePassword } from './../../api'

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  newPassword: string = null;
  oldPassword: string = null;

  success: { messages: Array<String>} = { messages: null};
  error: { newPassword: Array<String>, oldPassword: Array<String>, messages: Array<String>} = { newPassword: null, oldPassword: null, messages: null}

  constructor(private http: Http) { }

  ngOnInit() {
  }

  handleChangePassword() {

    this.success = { messages: null }
    this.error = { newPassword: null, oldPassword: null, messages: null }

    if(window.localStorage.getItem('userId') != null && window.localStorage.getItem('sessionToken') != null && window.localStorage.getItem('userName') != null) {

      let payload = {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword
      }

      let userId = window.localStorage.getItem('userId');
      let sessionToken = window.localStorage.getItem('sessionToken');

      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + btoa(userId + ':' + sessionToken))

      this.http.post(changePassword, payload, { headers: headers})
        .toPromise()
        .then(result => {
          this.success.messages = result.json().messages
          this.newPassword = null
          this.oldPassword = null

        })
        .catch(result => {
          this.error.newPassword = result.json().newPassword
          this.error.oldPassword = result.json().oldPassword
          this.error.messages = result.json().messages
        })
    }
  }
}
