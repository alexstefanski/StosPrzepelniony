import { Component, OnInit } from '@angular/core';
import {AdService} from "../common/services/ad.service";
import {AdFilters} from "../common/models/ad.filters";
import {Ad} from "../common/models/ad";
import {Category} from "../common/models/category";
import {CategoryService} from "../common/services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  adsList: Array<Ad>;
  categoriesList: Array<Category>;
  salaryViewSelected: boolean = false;
  salaryRangeMin: number = 0;
  salaryRangeMax: number = 10000;
  salaryValue: number = 6000;

  searchQuery: string = null;
  selectedCategories: Array<Category> = [];
  costType: number = null;
  minimumCost: number = null;
  maximumCost: number = null;

  constructor(private adService: AdService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.prepareCategoriesList();
    this.prepareAdsList();
  }

  changeSalaryView() {
    this.salaryViewSelected = true;
  }

  changeCategoryView() {
    this.salaryViewSelected = false;
  }

  onSliderChange() {

  }

  prepareAdsList() {
    this.adService.getAllAds(new AdFilters(), (errors, adsArray) => {
      if (errors == null) {
        this.adsList = adsArray;
      } else {
        this.adsList = null;
      }
    });
  }

  prepareCategoriesList() {
    this.categoryService.getAllCategories((errors, categoriesArray) => {
      if (errors == null) {
        this.categoriesList = categoriesArray;
      } else {
        this.categoriesList = null;
      }
    })
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

  checkedCategory(category: Category) {
    if (!this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    } else {
      let index = this.selectedCategories.indexOf(category);
      if (index > -1) {
          this.selectedCategories.splice(index, 1);
      }
    }

    // Tworzenie nowego obiektu z istniejącej tablicy po usunieciu
    // lub dodaniu kategorii. W ten sposób Angular odnotowuje że zaszły zmiany
    // i odświeża filtrowanie.
    this.selectedCategories = this.selectedCategories.slice(0);

    category.checked = !category.checked;
  }
}
