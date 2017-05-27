import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { loginUser, userInfo } from './../../api';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email: string;
  password: string;

  handlingLogin: Boolean = false;
  error: { messages: Array<string>} = { messages: null };

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  handleLogin() {
    this.handlingLogin = true;

    this.error = { messages: null };

    let payload = {
      email: this.email,
      password: this.password
    }

    this.http.post(loginUser, payload)
      .toPromise()
      .then(response => {
        // Otrzymaliśmy od serwera nasze userID oraz wygenerowany sessionToken.

        // Zapisujemy lokalnie userID - te dane możemy podejrzeć w narzędziach developerskich przeglądarki. Zakładka DANE
        window.localStorage.setItem('userId', response.json().userId)

        // Zapisujemy lokalnie sessionToken - te dane możemy podejrzeć w narzędziach developerskich przeglądarki. Zakładka DANE
        window.localStorage.setItem('sessionToken', response.json().sessionToken)

        let userInfoURL = userInfo(response.json().userId)

        // Przygotowujemy nagłówek do autoryzacji.
        // Kożystamy z Basic Auth: dane w formacie userId:sessionToken np. 1:nzyRYJbR8yOJdhaC7xnW3BatRRyQAbxs, są skracane base64 - to ta funkcja btoa.
        // Dodajemy z przodu słowa Basic. W rezultacie otrzymujemy treść nagłwka 'Basic MTpuenlSWUpiUjh5T0pkaGFDN3huVzNCYXRSUnlRQWJ4cw=='
        // Pole nagłówka to Authorization, te wszytskie dane możemy podejrzeć w narzędziach developerskich przeglądarki. Zakładka sieci i nagłówki żądania.
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Basic ' + btoa(response.json().userId + ':' + response.json().sessionToken))
        console.log(btoa(response.json().userId + ':' + response.json().sessionToken))

        // Tworzyliśmy nagłówek autoryzacji ponieważ akórat te API wymaga autoryzacji użytkownika.
        this.http.get(userInfoURL, { headers: headers})
          .toPromise()
          .then(response => {

            // Zapisujemy lokalnie userName - te dane możemy podejrzeć w narzędziach developerskich przeglądarki. Zakładka DANE
            window.localStorage.setItem('userName', response.json().firstName)
            this.router.navigate(['user']);
          })
          .catch(response => {

            this.handlingLogin = false;
          })

      })
      .catch(response => {
        this.error.messages = response.json().messages

        this.handlingLogin = false;
      })
  }
}
