import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {resetPassword} from './../../api'

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent implements OnInit {

  email: string = null

  success: { messages: Array<string> } = { messages: null };
  error: { messages: Array<string>, email: Array<string>} = { messages: null, email: null };

  handlingResetPassword: boolean = false;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  handleResetPassword() {
    this.handlingResetPassword = true;

    this.success = { messages: null };
    this.error = { messages: null, email: null };

    this.http.post(resetPassword, { email: this.email})
      .toPromise()
      .then(success => {
        this.success = success.json();

        this.email = null;

        this.handlingResetPassword = false;
        scroll(0,0)
      })
      .catch(error => {
        this.error = error.json();

        this.handlingResetPassword = false;
        scroll(0,0)
      })
  }

}
