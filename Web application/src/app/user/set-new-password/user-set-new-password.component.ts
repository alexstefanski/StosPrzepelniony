import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { setNewPassword } from './../../api';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user-set-new-password',
  templateUrl: './user-set-new-password.component.html',
  styleUrls: ['./user-set-new-password.component.css']
})
export class UserSetNewPasswordComponent implements OnInit {

  userId: number = null;
  tokenId: number = null;
  token: string = null;

  password: string = null;

  success: { messages: Array<string> } = { messages: null};
  error: { messages: Array<string>, password: Array<string>, userId: Array<string>, tokenId: Array<string>, token: Array<string> } = { messages: null, password: null, userId: null, tokenId: null, token: null };

  handlingSetNewPassword: boolean = false;

  constructor(private http: Http, private router: ActivatedRoute ) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params.userId;
    this.tokenId = this.router.snapshot.params.tokenId;
    this.token = this.router.snapshot.params.token;
  }

  handleSetNewPassword() {
    this.handlingSetNewPassword = true;

    this.success = { messages: null};
    this.error = { messages: null, password: null, userId: null, tokenId: null, token: null };

    this.http.post(setNewPassword(this.userId, this.tokenId, this.token), { password: this.password })
      .toPromise()
      .then(success => {
        this.success = success.json();

        this.password = null;

        this.handlingSetNewPassword = false;
        scroll(0,0);
      })
      .catch(error => {
        this.error = error.json();

        this.password = null;

        this.handlingSetNewPassword = false;
        scroll(0,0);
      })
  }

}
