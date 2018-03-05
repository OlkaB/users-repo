import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuth;

  constructor(
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC4NvknqGNOWILJIQNhSbZV5t6gbB7psRg',
      authDomain: 'testing-e5b72.firebaseapp.com'
    });
    this.userAuthService.getCurrentSignIn();
    this.userAuthService.userToken.subscribe((token) => {
      this.isAuth = token !== null && token !== undefined;
    });
  }

  logOut() {
    this.userAuthService.logOut();
  }

}
