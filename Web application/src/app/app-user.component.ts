import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

}
