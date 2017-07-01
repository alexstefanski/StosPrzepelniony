import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import { Router } from '@angular/router';
import {NotificationsService} from "angular2-notifications/dist";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  p: number = 1;
  categories: Array<Category>;
  handlingEditing: boolean = false;
  handlingAdding: boolean = false;
  messages: string = '';
  private editedCategory: Category;
  constructor(private categoryService: CategoryService,
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
      } else {
        this.categories = null;
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
          this.messages = errors.json().messages;
        }
      }
    })
  }

  deleteCategory(category) {
    this.categoryService.postDeleteCategory(category.categoryId, (errors, response) => {
      if (errors === null) {
        this.notificationsService.success('Pomyślnie usunięto');
      } else {
        if (errors.status === 406) {
          let titleMsg = isNullOrUndefined(errors.json().messages) === false ? errors.json().messages : 'Niepowodzenie';
          let contentMsg = isNullOrUndefined(errors.json().categoryId) === false ? errors.json().categoryId : '';
          this.notificationsService.alert(titleMsg, contentMsg);
        } else if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          this.notificationsService.error('Nie można usunąć', errors.json().messages);
        }
      }
    });
  }

  handleEdit(category: Category) {
    this.editedCategory = new Category();
    this.editedCategory.name = category.name;
    this.editedCategory.description = category.description;
    category.edited = true;
    this.handlingEditing = true;
  }

  editCategory(category) {
    category.name = category.name.trim();
    category.description = category.description.trim();

    this.categoryService.postEditCategory(category, (errors, response) => {
      if (!errors) {
        if (response.status === 200) {
          this.notificationsService.success('Pomyślnie zaktualizowano');
          category.edited = false;
          this.handlingEditing = false;
        }
      } else {
        if (errors.status === 422) {
          this.notificationsService.error('Niepowodzenie', errors.json().messages);
        } else {
          let contentMsg = isNullOrUndefined(errors.json().name) === false ? errors.json().name + ' ' : '';
          contentMsg += isNullOrUndefined(errors.json().description) === false ? errors.json().description : '';
          this.notificationsService.error('Nie udało się zaktualizować', contentMsg);
        }
      }
    });

  }

  cancel(category) {
    category.name = this.editedCategory.name;
    category.description = this.editedCategory.description;
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
