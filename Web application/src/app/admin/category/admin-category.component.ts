import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { adminCategories } from '../../api';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories: Array<{category}> = null;
  category: Array<{categoryId: number, name: string, description: string, categoryIdParent: number}> = null;

  constructor(private http: Http) { }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(adminCategories, {headers: headers})
      .toPromise()
      .then(response => {
        this.categories = response.json();
      })
      .catch(response => {
        console.log(response);
      });
  }

  mainCategory(idParent) {
    return idParent === 0;
  }
}
