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
  p: number = 1;
  adsList: Array<Ad> = new Array<Ad>();
  handlingEditing: boolean = false;
  newAdStatusNum: number;
  messages: string = '';
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
        this.adsList = null;
       if (errors.status === 422) {
         this.notificationsService.error('Niepowodzenie', errors.json().messages);
         this.messages = errors.json().messages;
       }
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
      return;
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
      } else {
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          this.notificationsService.error('Niepowodzenie');
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
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          this.notificationsService.error('Nie można usunąć');
        }
      }
    });
  }
}
