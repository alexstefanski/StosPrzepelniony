import { Component, OnInit } from '@angular/core';
import { Ad } from '../../common/models/ad';
import { AdminAdService } from '../../common/services/admin.ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './admin-ad.component.html',
  styleUrls: ['./admin-ad.component.css']
})
export class AdminAdComponent implements OnInit {
  adsList: Array<Ad> = new Array<Ad>();
  constructor(private adminAdService: AdminAdService) { }

  ngOnInit() {
    this.prepareAdsList();
    this.adminAdService.adAvailable$.subscribe(
        () => this.prepareAdsList()
    );
  }

  prepareAdsList() {
    this.adminAdService.getAllAds((errors, adsArray) => {
      if (errors === null) {
        this.adsList = adsArray;
      } else {
        console.log(errors);
      }
    });
  }
}
