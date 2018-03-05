import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserAuthService {

  userToken = new BehaviorSubject(null);

  constructor(
    private router: Router
  ) { }

  signup(email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
            console.log('SignUp response: ', response);
            this.getToken();
            this.router.navigate(['/profile']);
          });
    }).catch(
      error => console.log('Error during signing up: ', error)
    );
  }

  signIn(email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
          console.log('SignIn response: ', response);
            this.getToken();
            this.router.navigate(['/wall']);
          });
    }).catch(
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
    const userTokenToOverWrite = this.userToken;
    return firebase.auth().currentUser.getIdToken().then((token: string) => {
      userTokenToOverWrite.next(token);
    });
  }

  getCurrentSignIn() {
    const userTokenToOverWrite = this.userToken;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.auth().currentUser.getIdToken().then(token => {
          userTokenToOverWrite.next(token);
        });
      } else {
        console.log('getCurrentSignIn: No user is signed in.');
      }
    });
  }
}
