import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<Category>;
  message: string;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
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

  deleteCategory(category) {
    this.categoryService.postDeleteCategory(category.categoryId, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
          this.router.navigate(['admin/category', this.categories]);
        }
      } else {
        this.message = errors.message.join(' ');
      }
    });
  }

  handleEdit(category) {
    category.edited = true;
  }

  editCategory(category) {
    this.categoryService.postEditCategory(category, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
          category.edited = false;
          this.router.navigate(['admin/category', this.categories]); //TODO odświeżanie strony
        }
      } else {
        this.message = errors.message;
      }
    });

  }

  cancel(category) {
    category.edited = false;
    this.router.navigate(['admin/category', this.categories]);
  }
}
