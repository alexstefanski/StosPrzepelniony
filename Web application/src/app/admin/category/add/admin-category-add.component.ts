import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { adminCategoryAdd } from '../../../api';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {

  category: Array<{name: string, description: string, categoryIdParent: number}> = null;
  categoryId: number;
  name: string;
  description: string;

  constructor(private http: Http ) { }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(adminCategoryAdd, {headers: headers})
      .toPromise()
      .then(response => {
        this.category = response.json();
      })
      .catch(response => {
        console.log(response);
      });
  }

  handleAdd() {
    const categoryData = {
      id: this.categoryId,
      name: this.name,
      description: this.description
    };
  }

}
