import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import { Router } from '@angular/router';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<Category>;
  handlingEditing: boolean = false;
  message: string;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.prepareCategoriesList();
    this.categoryService.categoryAvailable$.subscribe(
        () => this.prepareCategoriesList()
    );
  }

  prepareCategoriesList() {
    this.categoryService.getAllCategories((errors, categories) => {
      if (!errors) {
        this.categories = categories.sort((a,b) => this.sortCategoriesById(a,b));
      }
    })
  }

  deleteCategory(category) {
    this.categoryService.postDeleteCategory(category.categoryId, (errors, response) => {
      if (errors === null) {
        this.notificationsService.success('Pomyślnie usunięto');
      } else {
        this.notificationsService.error('Nie można usunąć', errors.json().messages);
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
          this.notificationsService.success('Pomyślnie zaktualizowano');
          category.edited = false;
          this.handlingEditing = false;
        }
      } else {
        this.notificationsService.error('Nie udało się zaktualizować');
      }
    });

  }

  cancel(category) {
    category.edited = false;
    this.handlingEditing = false;
  }

  sortCategoriesById(a, b) {
    if (a.categoryId < b.categoryId) {
      return -1;
    }
    if (a.categoryId > b.categoryId) {
      return 1;
    }

    return 0;
  }
}
