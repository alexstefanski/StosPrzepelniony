import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { adminCategoriesList } from './../../../api';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Array<{category}> = null;
  category: Array<{categoryId: number, name: string, description: string, categoryIdParent: number}> = null;

  constructor(private http: Http) { }

  ngOnInit() {

    if (window.localStorage.getItem('userId') != null && window.localStorage.getItem('sessionToken') != null
      && window.localStorage.getItem('userName') != null) {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(adminCategoriesList, {headers: headers})
        .toPromise()
        .then(response => {
          this.categories = response.json();
        })
        .catch(response => {
          console.log(response);
        });
    }
  }

  mainCategory(idParent) {
    return idParent === 0;
  }

}
