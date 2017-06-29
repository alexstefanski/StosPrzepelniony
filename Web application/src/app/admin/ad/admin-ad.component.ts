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
  handlingEditing: boolean = false;
  newAdStatusNum: number;
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

  handleEdit(ad: Ad) {
    this.handlingEditing = true;
    ad.edited = true;
    this.newAdStatusNum = ad.statusNum;
  }

  editAdStatus(ad: Ad) {
    const payload = {
      status: this.newAdStatusNum
    };

    this.adminAdService.postEditAdStatus(ad.id, payload, (errors, result) => {
      if (errors === null) {
        if (result.status === 204) {
          ad.status = '';
          this.handlingEditing = false;
          ad.edited = false;
        }
      }
    });
  }

  handleCancel(ad: Ad) {
    ad.edited = false;
    this.handlingEditing = false;
  }

  deleteAd(ad: Ad) {
    this.adminAdService.deleteAdById(ad.id, (errors, result) => {
      debugger
      if (errors != null) {

      }
    });
  }
}
