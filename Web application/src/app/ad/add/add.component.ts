import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addAds } from '../../api';
import { UserService } from '../../common/services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdAddComponent implements OnInit {
  private addForm: FormGroup;
  private success = { messages: null };
  private error = { subject: null, categoryId: null, content: null, costHour: null, costTotal: null };

  constructor(private formBuilder: FormBuilder, private http: Http, private userService: UserService, private router: Router) {
    this.addForm = formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      salaryType: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addAdv() {
    let payload = {
      userId: this.userService.currentUser.id,
      subject: this.addForm.value.title,
      categoryId: this.addForm.value.category,
      content: this.addForm.value.description,
      costHour: (this.addForm.value.salaryType === 'hourly') ? this.addForm.value.salary : null,
      costTotal: (this.addForm.value.salaryType === 'monthly') ? this.addForm.value.salary : null,
    };

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
      this.error.subject = response.json().subject;
      this.error.categoryId = response.json().categoryId;
      this.error.content = response.json().content;
      this.error.costHour = response.json().costHour;
      this.error.costTotal = response.json().costTotal;
    });
  }
}
