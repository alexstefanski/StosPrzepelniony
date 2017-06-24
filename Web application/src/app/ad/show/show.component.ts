import { Component, OnInit } from '@angular/core';
import { AdService } from "../../common/services/ad.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ad } from "../../common/models/ad";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class AdShowComponent implements OnInit {
  private adId: number;
  ad: Ad = null;
  categoryName: string;
  constructor(private adService: AdService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.adId = +params['id'];

        this.adService.getAdById(this.adId, (errors, adInfo) => {
          if (errors == null) {
            this.ad = adInfo;
            this.categoryName = this.changeCategoryNumberToText(this.ad.categoryId);
          } else {
            this.router.navigate(['/user']);
          }
        });
      } else {
        this.router.navigate(['/user']);
      }

    });
  }

  changeCategoryNumberToText(nmb: number) {
    switch(nmb) {
      case 1:
        return 'Android';
      case 2:
        return 'C++';
      case 3:
        return 'IOS';
      case 4:
        return 'Objective-C';
      case 5:
        return 'Assembler';
      case 6:
        return 'Delphi/Object Pascal';
      case 7:
        return 'Java';
      case 8:
        return 'PHP';
      case 9:
        return 'C';
      case 10:
        return 'GO';
      case 11:
        return 'Javascript';
      case 12:
        return 'PL/SQL';
      case 13:
        return 'C#';
      case 14:
        return 'HTML/CSS';
      case 15:
        return 'Matlab';
    }
  }

}
