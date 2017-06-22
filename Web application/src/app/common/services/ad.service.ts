import { Injectable , } from '@angular/core';
import { Http , RequestOptions , URLSearchParams } from '@angular/http';
import {listAds, showAd} from '../../api';
import { UserService } from './user.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import {AdFilters} from "../models/ad.filters";
import {isNullOrUndefined} from "util";
import {Ad} from "../models/ad";

@Injectable()
export class AdService {
    private adAvailableSource = new Subject();
    adAvailable$ = this.adAvailableSource.asObservable();
    constructor(private http: Http, private userService: UserService) { }

    getAllAds(adsFilters, callback) {
        const headers = this.userService.getAuthenticatedHeader();
        let params: URLSearchParams = this.getParamsQuery(adsFilters);

        this.http.get(listAds, {headers: headers, search: params})
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

    getAdById(adId, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(showAd(adId), {headers: headers})
            .toPromise()
            .then((response) => {
                let ad = this.assignAdValues(response.json());

                callback(null, ad);
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
        ad.categoryId = item.categoryId;
        ad.subject = item.subject;
        ad.costTotal = item.costTotal;
        ad.costHour = item.costHour;
        ad.date = new Date(item.date);
        ad.content = item.content;

        if (!isNullOrUndefined(item.status)) {
            if (+item.status === 0)
                ad.status = 'aktywne';
            else if (+item.status === 1)
                ad.status = 'nieaktywne';
        }

        return ad;
    }

    private getParamsQuery(adsFilters: AdFilters): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();

        if (!isNullOrUndefined(adsFilters.userId))
            params.set('userId', adsFilters.userId.toString());

        if (!isNullOrUndefined(adsFilters.categoryId))
            params.set('categoryId', adsFilters.categoryId.toString());

        if (!isNullOrUndefined(adsFilters.subject))
            params.set('subject', adsFilters.subject);

        if (!isNullOrUndefined(adsFilters.content))
            params.set('content', adsFilters.content);

        return params;
    }
}