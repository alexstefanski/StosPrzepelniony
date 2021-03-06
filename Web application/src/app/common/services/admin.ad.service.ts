import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import {adminAdsDeleteById, adminAdsList, adminAdsStatusEdit} from '../../api';
import { UserService } from './user.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { isNullOrUndefined } from 'util';
import { Ad } from '../models/ad';

@Injectable()
export class AdminAdService {
    private adAvailableSource = new Subject();
    adAvailable$ = this.adAvailableSource.asObservable();
    constructor(private http: Http, private userService: UserService) { }

    getAllAds(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminAdsList, {headers: headers})
            .toPromise()
            .then((response) => {
                let adsArray = new Array<Ad>();

                response.json().forEach((item) => {
                    let ad = this.assignAdValues(item);

                    adsArray.push(ad);
                });

                callback(null, adsArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    postEditAdStatus(adId: number, payload, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.post(adminAdsStatusEdit(adId), payload, {headers: headers})
            .toPromise()
            .then((response) => {
                this.adAvailableSource.next();
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    deleteAdById(adId, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.delete(adminAdsDeleteById(adId), {headers: headers})
            .toPromise()
            .then((response) => {
                this.adAvailableSource.next();
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    private assignAdValues(item): Ad {
        let ad = new Ad();

        ad.id = item.adId;
        ad.userId = item.user.userId;
        ad.userFirstName = item.user.firstName;
        ad.userLastName = item.user.lastName;
        ad.categoryId = item.categories[0];
        ad.subject = item.subject;
        ad.costTotal = item.costTotal;
        ad.costHour = item.costHour;
        ad.date = new Date(item.date);

        if (!isNullOrUndefined(item.status)) {
            ad.statusNum = +item.status;
            if (+item.status === 0)
                ad.status = 'aktywne';
            else if (+item.status === 1)
                ad.status = 'nieaktywne';
            else if (+item.status === 2)
                ad.status = 'zablokowane';
        }

        return ad;
    }

}