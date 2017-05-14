import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { registerUser } from './../../api';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  firstName: string;
  lastName: string;
  password: string;

  handlingRegister: Boolean = false;
  success: { messages: Array<String> };
  error: { email: string, firstName: string, lastName: string, password: string, messages: Array<String> } = { email: null, firstName: null, lastName: null, password: null, messages: null };

  constructor(private http: Http) { }

  ngOnInit() {
  }

  handleRegister() {
    this.handlingRegister = true

    let payload = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    }

    this.http.post(registerUser, payload)
      .toPromise()
      .then(response => {
        console.log(response)
      })
      .catch(response => {
        this.error.email = response.json().email;
        this.error.firstName = response.json().firstName;
        this.error.lastName = response.json().lastName;
        this.error.password = response.json().password;
        this.error.messages = response.json().messages;
      })

  }

}
