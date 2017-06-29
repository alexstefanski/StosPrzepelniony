import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../common/models/category';
import { CategoryService } from '../../../common/services/category.service';

import 'rxjs/add/operator/toPromise';
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {
  category: Category = new Category();
  message: string = null;
  constructor(private categoryService: CategoryService,
              private router: Router,
              private notificationsService: NotificationsService) {
    this.category.categoryIdParent = 0; // ustalone, że każda kategoria jest główna
  }

  ngOnInit() {

  }

  onSubmit() {
    this.categoryService.postAddCategory(this.category, (errors, response) => {
      if (!errors) {
        if (response.status === 204) {
          this.notificationsService.success('Pomyślnie dodano kategorię');
          this.router.navigate(['admin/category']);
        }
      } else {
        this.notificationsService.error('Niepowodzenie');
      }
    })
  }

}
