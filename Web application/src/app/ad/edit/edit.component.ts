import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { AdService } from '../../common/services/ad.service';
import { Ad } from "../../common/models/ad";
import { ActivatedRoute, Router } from "@angular/router";
import { editAd, showAd } from '../../api';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class AdEditComponent implements OnInit {
  private editForm: FormGroup;
  private ad: Ad;
  private adId: number;

  constructor(private formBuilder: FormBuilder,
              private http: Http,
              private userService: UserService,
              private adService: AdService,
              private route: ActivatedRoute,
              private router: Router) {

    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      salaryType: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!isNaN(+params['id'])) {
        this.adId = +params['id'];

        this.adService.getAdById(this.adId, (errors, adInfo) => {
          if (errors == null) {
            this.ad = adInfo;

            this.editForm.controls['title'].setValue(this.ad.subject);
            this.editForm.controls['category'].setValue(this.ad.categoryId);
            this.editForm.controls['description'].setValue(this.ad.content);
            this.editForm.controls['salaryType'].setValue((this.ad.costTotal != null) ? 'monthly' : 'hourly');
            this.editForm.controls['salary'].setValue((this.ad.costTotal != null) ? this.ad.costTotal : this.ad.costHour);

          } else {
            this.router.navigate(['/user']);
          }
        });
      } else {
        this.router.navigate(['/user']);
      }

    });
  }

  editAdv() {
    let payload = {
      userId: this.userService.currentUser.id,
      subject: this.editForm.value.title,
      categoryId: this.editForm.value.category,
      content: this.editForm.value.description,
      costHour: (this.editForm.value.salaryType === 'hourly') ? this.editForm.value.salary : null,
      costTotal: (this.editForm.value.salaryType === 'monthly') ? this.editForm.value.salary : null
    };

    let header = this.userService.getAuthenticatedHeader();

    this.http.post(editAd(this.adId), payload, {headers: header}).toPromise().then( response => {
      //this.success = response.json().messages;
      this.editForm.value.title = null;
      this.editForm.value.category = null;
      this.editForm.value.description = null;
      this.editForm.value.salaryType = null;
      this.editForm.value.salary = null;
      this.router.navigate(['/user']);
    }).catch(error => {
      console.log(error);
    });
  }
}
