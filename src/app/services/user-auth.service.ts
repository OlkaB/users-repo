import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Injectable()
export class UserAuthService {

  userToken: string;

  constructor(
    private router: Router
  ) { }

  signup(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log('Error during signing up: ', error)
    );
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['/profile']);
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          this.userToken = token;
          console.log('User signed in: ', this.userToken);
        });
      }
    ).catch(
      error => console.log('Error during signing up: ', error)
    );
  }

  logOut() {
    firebase.auth().signOut();
    this.userToken = null;
    this.router.navigate(['/signIn']);
  }

  /* get firebase auth token for logged user */
  getToken() {
    return firebase.auth().currentUser.getIdToken().then((token: string) => {
      this.userToken = token;
    });
  }

  isAuthenticated() {
    return this.userToken !== null && this.userToken !== undefined;
  }

}
