import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  isLoggedIn: Boolean = false;
  userName: string

  ngAfterContentChecked() {
    if(window.localStorage.getItem('userId') != null && window.localStorage.getItem('sessionToken') != null && window.localStorage.getItem('userName') != null) {
      this.isLoggedIn = true;
      this.userName = window.localStorage.getItem('userName')
    } else {
      this.isLoggedIn = false;
    }
  }

}
