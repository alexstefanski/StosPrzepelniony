import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { loginUser, userInfo } from './../../api';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  handlingLogin: Boolean = false;
  error: Object;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  handleLogin() {
    this.handlingLogin = true;

    let payload = {
      email: this.email,
      password: this.password
    }

    this.http.post(loginUser, payload)
      .toPromise()
      .then(response => {
        window.localStorage.setItem('userId', response.json().userId)
        window.localStorage.setItem('sessionToken', response.json().sessionToken)

        let userInfoURL = userInfo(response.json().userId)

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Basic ' + btoa(response.json().userId + ':' + response.json().sessionToken))

        this.http.get(userInfoURL, { headers: headers})
          .toPromise()
          .then(response => {
            window.localStorage.setItem('userName', response.json().firstName)
            this.router.navigate([''])
          })
          .catch(response => {
            console.log(response)
            this.handlingLogin = false;
          })

      })
      .catch(response => {
        console.log(response)
        this.handlingLogin = false;
      })
  }
}
