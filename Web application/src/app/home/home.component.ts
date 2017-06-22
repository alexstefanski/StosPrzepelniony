import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdService} from "../common/services/ad.service";
import {AdFilters} from "../common/models/ad.filters";
import {Ad} from "../common/models/ad";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adsList: Array<Ad>;
  salaryViewSelected: boolean = false;
  salaryRangeMin: number = 0;
  salaryRangeMax: number = 10000;
  salaryValue: number = 6000;
  constructor(private adService: AdService) { }

  ngOnInit() {
    this.adService.getAllAds(new AdFilters(), (errors, adsArray) => {
      if (!errors) {
        this.adsList = adsArray;
      }
    });
  }

  changeSalaryView() {
    this.salaryViewSelected = true;
  }

  changeCategoryView() {
    this.salaryViewSelected = false;
  }

  onSliderChange() {

  }

   formatDate(date: Date) {
      let year = date.getFullYear(),
          month = (date.getMonth() + 1).toString(),
          formatedMonth = (month.length === 1) ? ("0" + month) : month,
          day = date.getDate().toString(),
          formatedDay = (day.length === 1) ? ("0" + day) : day,
          hour = date.getHours().toString(),
          formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
          minute = date.getMinutes().toString(),
          formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
          second = date.getSeconds().toString(),
          formatedSecond = (second.length === 1) ? ("0" + second) : second;
    return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
  };
}
