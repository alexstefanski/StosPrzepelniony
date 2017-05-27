import { Component , ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  fullLogoPath: string;

  constructor(private elementRef: ElementRef) {
    this.fullLogoPath = '../assets/images/logo.png';
  }
}
