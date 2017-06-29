import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  options = {
    position: ['bottom', 'right'],
    timeOut: 3500,
    lastOnBottom: true,
    clickToClose: true,
    animate: 'fromRight',
    maxStack: 4
  };
  constructor() { }

  ngOnInit() {

  }

}
