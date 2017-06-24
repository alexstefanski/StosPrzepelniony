import { Component, OnInit } from '@angular/core';
import { deleteAd } from '../../api';
import { Ad } from "../../common/models/ad";
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import { UserService } from "../../common/services/user.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class AdDeleteComponent implements OnInit {
  private adId: number;

  constructor(private ar: ActivatedRoute,
              private router: Router,
              private http: Http,
              private userService: UserService) { }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.adId = +params['id'];

        this.deleteAdv();
        this.router.navigate(['/user']);
      } else {
        console.log('Wrong param!');
      }
    });
  }

  deleteAdv() {
    let header = this.userService.getAuthenticatedHeader();

    this.http.delete(deleteAd(this.adId), {headers: header}).toPromise().then().catch(function(error) {
      console.log(error);
    });
  }

}
