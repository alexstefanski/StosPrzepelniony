import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { } from '../../api';
import { UserService } from '../../common/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AdAddComponent implements OnInit {
  private addForm: FormGroup;

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

    console.log(payload);
  }

}
