import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { userInfo } from './../../api'
import { UserService } from '../../common/services/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [UserService]
})
export class UserInfoComponent implements OnInit {

  firstName: string = null;
  lastName: string = null;
  email: string = null;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    const headers = this.userService.getAuthenticatedHeader();

    this.http.get(userInfo(this.userService.currentUser.id), {headers: headers})
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
