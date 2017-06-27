import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router'

import { confirmRegister } from './../../api'

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user-confirm-register',
  templateUrl: './user-confirm-register.component.html',
  styleUrls: ['./user-confirm-register.component.css']
})
export class UserConfirmRegisterComponent implements OnInit {

  userId: number = null;
  tokenId: number = null;
  token: string = null;

  success: { messages: Array<string> } = { messages: null };
  error: { messages: Array<string>, userId: Array<string>, tokenId: Array<string>, token: Array<string> } = { messages: null, userId: null, tokenId: null, token: null };

  handlingConfirmRegister: boolean = true;

  constructor(private http: Http, private router: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params.userId
    this.tokenId = this.router.snapshot.params.tokenId
    this.token = this.router.snapshot.params.token

    this.http.get(confirmRegister(this.userId, this.tokenId, this.token))
      .toPromise()
      .then(success => {
        this.success = success.json()
        this.handlingConfirmRegister = false;
      })
      .catch(error => {
        this.error = error.json()
        this.handlingConfirmRegister = false;
      })

  }

}
