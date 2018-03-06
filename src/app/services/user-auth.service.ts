import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserAuthService {

  userToken = new BehaviorSubject(null);
  userId = new BehaviorSubject(null); // user email is used as userId

  constructor(
    private router: Router
  ) { }

  signup(email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
            console.log('SignUp response: ', response);
            this.getToken();
            this.getUserEmail();
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
            this.getUserEmail();
            this.router.navigate(['/wall']);
          });
    }).catch(
      error => console.log('Error during signing up: ', error)
    );
  }

  logOut() {
    firebase.auth().signOut();
    this.userToken.next(null);
    this.userId.next(null);
    this.router.navigate(['/signIn']);
  }

  /* get firebase auth token for logged user */
  getToken() {
    const userTokenToOverWrite = this.userToken;
    firebase.auth().currentUser.getIdToken().then((token: string) => {
      userTokenToOverWrite.next(token);
    }).catch(
      error => console.log('Couldn\'t retrieve user token. ', error)
    );
  }

  getUserEmail() {
    const userIdToSave = this.userId;
    const user = firebase.auth();

    if (user && user['email']) {
      const userMail = user['email'].replace(/\./g, '--').replace('@', '---');
      userIdToSave.next(userMail);
    }
  }

  getCurrentSignIn() {
    const userTokenToOverWrite = this.userToken;
    const userIdToSave = this.userId;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        /* store user id = user email */
        userIdToSave.next(user['email'].replace(/\./g, '--').replace('@', '---'));
        /* store user firebase auth token */
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          userTokenToOverWrite.next(token);
        });
        console.log('getCurrentSignIn _ user Data: ', user);
      } else {
        console.log('getCurrentSignIn: No user is signed in.');
      }
    });
  }
}
