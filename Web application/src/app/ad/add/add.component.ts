import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addAds } from '../../api';
import { UserService } from '../../common/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdAddComponent implements OnInit {
  private addForm: FormGroup;
  private success = { message: null };
  private error = { subject: null, categoryId: null, content: null, costHour: null, costTotal: null };

  constructor(private formBuilder: FormBuilder, private http: Http, private userService: UserService) {
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
      costTotal: (this.addForm.value.salaryType === 'monthly') ? this.addForm.value.salary : null
    };

    this.http.post('http://localhost:3000/ads/add', payload).toPromise().then(response => {
      this.success = response.json().message;
      this.addForm.value.title = null;
      this.addForm.value.category = null;
      this.addForm.value.description = null;
      this.addForm.value.salaryType = null;
      this.addForm.value.salary = null;
      console.log(response)
    }).catch(response => {
      this.error.subject = response.json().subject;
      this.error.categoryId = response.json().categoryId;
      this.error.content = response.json().content;
      this.error.costHour = response.json().costHour;
      this.error.costTotal = response.json().costTotal;
    });
  }

}
