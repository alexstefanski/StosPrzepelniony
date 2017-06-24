import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addAds } from '../../api';
import { UserService } from '../../common/services/user.service';
import { Router } from "@angular/router";
import { Category } from '../../common/models/category';
import { CategoryService } from '../../common/services/category.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdAddComponent implements OnInit {
  private addForm: FormGroup;
  private success = { messages: null };
  private error = { subject: null, categoryId: null, content: null, salaryType: null, salaryValue: null};
  categoriesList: Array<Category>;
  selectedCategory: number = 0;
  constructor(private formBuilder: FormBuilder, private http: Http, private userService: UserService,
              private router: Router,
              private categoryService: CategoryService) {
    this.addForm = formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      salaryType: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoryService.getAllCategories((errors, categories) => {
      this.categoriesList = categories.sort((a,b) => this.sortCategoriesByNames(a,b));
    })
  }

  addAdv() {
    this.resetErrors();

    let payload = {
      userId: this.userService.currentUser.id,
      subject: this.addForm.value.title,
      content: this.addForm.value.description,
      costHour: (this.addForm.value.salaryType === 'hourly') ? this.addForm.value.salary : null,
      costTotal: (this.addForm.value.salaryType === 'monthly') ? this.addForm.value.salary : null,
    };

    if (this.addForm.value.category != 0) {
      payload['categoryId'] = this.addForm.value.category;
    }

    let header = this.userService.getAuthenticatedHeader();

    this.http.post(addAds, payload, {headers: header}).toPromise().then(response => {
      this.success = response.json().messages;
      this.addForm.value.title = null;
      this.addForm.value.category = null;
      this.addForm.value.description = null;
      this.addForm.value.salaryType = null;
      this.addForm.value.salary = null;
      this.router.navigate(['/user']);
    }).catch(response => {
      if (this.addForm.value.salaryType == 'nooption') {
        this.error.salaryType = 'Rodzaj wynagrodzenia musi być wybrany.';
      }
      if (!isNullOrUndefined(response.json().costHour)) {
        this.error.salaryValue = response.json().costHour;
      }
      if (!isNullOrUndefined(response.json().costTotal)) {
        this.error.salaryValue = response.json().costTotal;
      }
      this.error.subject = response.json().subject;
      this.error.categoryId = response.json().categoryId;
      this.error.content = response.json().content;
    });
  }

  sortCategoriesByNames(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  }

  private resetErrors() {
    this.error.subject = null;
    this.error.categoryId = null;
    this.error.content = null;
    this.error.salaryValue = null;
    this.error.salaryType = null;
  }

}
