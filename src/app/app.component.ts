import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { UserAuthService } from './services/user-auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuth;
  subscription: Subscription;

  constructor(
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC4NvknqGNOWILJIQNhSbZV5t6gbB7psRg',
      authDomain: 'testing-e5b72.firebaseapp.com'
    });
    this.userAuthService.getCurrentSignIn();
    this.subscription = this.userAuthService.userToken.subscribe((token) => {
      this.isAuth = token !== null && token !== undefined;
    });
  }

  logOut() {
    this.userAuthService.logOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
