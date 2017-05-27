import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { resendEmail } from './../../api'

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user-resend-email',
  templateUrl: './user-resend-email.component.html',
  styleUrls: ['./user-resend-email.component.css']
})
export class UserResendEmailComponent implements OnInit {

  email: string = null;

  success: { messages: Array<String>} = { messages: null };
  error: { email: Array<String>, messages: Array<String> } = { email: null, messages: null };

  constructor(private http: Http) { }

  ngOnInit() {
  }

  handleResendEmail() {
    this.success = { messages: null };
    this.error = { email: null, messages: null };

    let payload = {
      email: this.email
    }

    this.http.post(resendEmail, payload)
      .toPromise()
      .then(response => {
        this.success.messages = response.json().messages
        this.email = null
      })
      .catch(response => {
        this.error.messages = response.json().messages
        this.error.email = response.json().email
      })
  }

}
