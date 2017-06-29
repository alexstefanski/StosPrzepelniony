import { Component, OnInit } from '@angular/core';
import { Ad } from '../../common/models/ad';
import { AdminAdService } from '../../common/services/admin.ad.service';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-ad',
  templateUrl: './admin-ad.component.html',
  styleUrls: ['./admin-ad.component.css']
})
export class AdminAdComponent implements OnInit {
  adsList: Array<Ad> = new Array<Ad>();
  handlingEditing: boolean = false;
  newAdStatusNum: number;
  constructor(private adminAdService: AdminAdService, private notificationsService: NotificationsService) { }

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
    if (this.newAdStatusNum === ad.statusNum) {
      this.notificationsService.alert('Zmień status na inny bądź kliknij anuluj');
    }
    const payload = {
      status: this.newAdStatusNum
    };

    this.adminAdService.postEditAdStatus(ad.id, payload, (errors, result) => {
      if (errors === null) {
        if (result.status === 204) {
          ad.status = '';
          this.handlingEditing = false;
          ad.edited = false;
          this.notificationsService.success('Pomyślnie zaktualizowano');
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
      if (errors === null) {
        this.notificationsService.success('Pomyślnie usunięto');
      } else {
        this.notificationsService.error('Nie można usunąć');
      }
    });
  }
}
