import { Component, OnInit } from '@angular/core';
import {AdService} from "../../common/services/ad.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ad} from "../../common/models/ad";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class AdShowComponent implements OnInit {
  private adId: number;
  ad: Ad = null;
  constructor(private adService: AdService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.adId = +params['id'];

        this.adService.getAdById(this.adId, (errors, adInfo) => {
          if (errors == null) {
            this.ad = adInfo;
          } else {
            this.router.navigate(['/user']);
          }
        });
      } else {
        this.router.navigate(['/user']);
      }

    });
  }

}
