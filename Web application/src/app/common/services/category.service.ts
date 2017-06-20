import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import {adminCategories, adminCategoryAdd, adminCategoryEdit, adminCategoryDelete} from '../../api';
import { UserService } from './user.service';
import { Category } from '../models/category';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {
    private categoryAvailableSource = new Subject();
    categoryAvailable$ = this.categoryAvailableSource.asObservable();

    constructor(private http: Http, private userService: UserService) { }

    getAllCategories(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminCategories, {headers: headers})
            .toPromise()
            .then((response) => {
                const categoryArray = new Array<Category>();
                response.json().forEach((category) => {
                    const cat = new Category();
                    cat.categoryId = category.categoryId;
                    cat.categoryIdParent = category.categoryIdParent;
                    cat.name = category.name;
                    cat.description = category.description;

                    categoryArray.push(cat);
                });

                callback(null, categoryArray);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    postAddCategory(category, callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.post(adminCategoryAdd, category, {headers: headers})
            .toPromise()
            .then((response) => {
                this.categoryAvailableSource.next();
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            });
    }

    postDeleteCategory(categoryId, callback) {
      const headers = this.userService.getAuthenticatedHeader();

      this.http.delete(adminCategoryDelete(categoryId), {headers: headers})
        .toPromise()
        .then((response) => {
          this.categoryAvailableSource.next();
          callback(null, response);
        })
        .catch((errors) => {
          callback(errors, null);
        });
    }

    postEditCategory(category, callback) {
      const headers = this.userService.getAuthenticatedHeader();

      this.http.post(adminCategoryEdit(category.categoryId), category, {headers: headers})
        .toPromise()
        .then((response) => {
          this.categoryAvailableSource.next();
          callback(null, response);
        })
        .catch((errors) => {
          callback(errors, null);
        });
    }

}
