import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<Category>;
  handlingEditing: boolean = false;
  message: string;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.prepareCategoriesList();
    this.categoryService.categoryAvailable$.subscribe(
        () => this.prepareCategoriesList()
    );
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
      if (errors) {
        this.message = errors.message.join(' ');
      }
    });
  }

  handleEdit(category) {
    category.edited = true;
    this.handlingEditing = true;
  }

  editCategory(category) {
    this.categoryService.postEditCategory(category, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
          category.edited = false;
          this.handlingEditing = false;
        }
      } else {
        this.message = errors.message;
      }
    });

  }

  cancel(category) {
    category.edited = false;
    this.handlingEditing = false;
  }
}
