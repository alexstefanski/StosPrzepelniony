import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { adminCategoryAdd } from './../../../api';
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
  }

  handleAdd() {
    const categoryData = {
      id: this.categoryId,
      name: this.name,
      description: this.description
    };
  }

}
