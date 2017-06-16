import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<Category>;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.prepareCategoriesList();
    })
  }

  ngOnInit() {
    this.prepareCategoriesList();
  }

  prepareCategoriesList() {
    this.categoryService.getAllCategories((errors, categories) => {
      if (!errors) {
        this.categories = categories;
      }
    })
  }
}
