import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Category } from '../../../common/models/category';
import { CategoryService } from '../../../common/services/category.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {
  category: Category = new Category();
  message: string = null;
  constructor(private categoryService: CategoryService, private router: Router) {
    this.category.categoryIdParent = 0; // ustalone, że każda kategoria jest główna
  }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

  }

  onSubmit() {
    this.categoryService.postAddCategory(this.category, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
         this.router.navigate(['admin/category', this.category]);
        }
      } else {
        this.message = errors.messages.join(' ');
      }
    })
  }

}
