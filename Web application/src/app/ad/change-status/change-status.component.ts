import { Component, OnInit } from '@angular/core';
import { AdService } from "../../common/services/ad.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ad } from "../../common/models/ad";
import { Http } from "@angular/http";
import { UserService } from "../../common/services/user.service";
import { changeAdStatus } from '../../api';


@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class AdChangeStatusComponent implements OnInit {
  private adId: number;
  private ad: Ad = null;
  private adStatus = null;
  private success = { messages: null };

  constructor(private adService: AdService,
              private ar: ActivatedRoute,
              private router: Router,
              private http: Http,
              private userService: UserService) { }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.adId = +params['id'];

        this.adService.getAdById(this.adId, (errors, adInfo) => {
          if (errors == null) {
            this.ad = adInfo;
            this.adStatus = (this.ad.status === 'aktywne') ? 0 : 1;
            this.changeAdvStatus();
            let link = '/ad/' + this.adId + '/show';
            this.router.navigate([link]);
          } else {
            console.log(errors);
          }
        });
      } else {
        console.log('Wrong param!');
      }
    });
  }

  changeAdvStatus() {
    let payload = {
      status: (this.adStatus === 0) ? 1 : 0
    };

    let header = this.userService.getAuthenticatedHeader();

    this.http.post(changeAdStatus(this.adId), payload, {headers: header}).toPromise().then(function() {
      console.log('HOORAY');
      //this.adId = null;
      //this.ad = null;
      //this.adStatus = null;
    }).catch(function(error) {
      console.log(error);
    })
  }

}
