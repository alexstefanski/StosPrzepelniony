import { Injectable , } from '@angular/core';
import { Http } from '@angular/http';
import {adminCategories, adminCategoryAdd} from '../../api';
import { UserService } from './user.service';
import { Category } from '../models/category';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
    constructor(private http: Http, private userService: UserService) { }

    getAllCategories(callback) {
        const headers = this.userService.getAuthenticatedHeader();

        this.http.get(adminCategories, {headers: headers})
            .toPromise()
            .then((response) => {
                let categoryArray = new Array<Category>();
                response.json().forEach((category) => {
                    let cat = new Category();
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
                callback(null, response);
            })
            .catch((errors) => {
                callback(errors, null);
            })
    }

}
