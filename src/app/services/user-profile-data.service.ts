import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserAuthService } from './user-auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class UserProfileDataService {

  firebaseUrl;
  userId;
  userToken;
  userProfileData = new BehaviorSubject(null);

  constructor(
    private http: Http,
    private userAuthService: UserAuthService
  ) {
    this.userAuthService.userToken.subscribe((token) => {
      this.userToken = token;
    });
    this.userAuthService.userId.subscribe((userId) => {
      this.userId = userId;
    });
    /* prepare url to firebase user data with auth token */
    this.firebaseUrl = 'https://testing-e5b72.firebaseio.com/' + this.userId + '.json?auth=' + this.userToken;
    this.getData().subscribe();
  }

  getData() {
    console.log('get Data initiazlied: ', this.firebaseUrl);
    return this.http.get(this.firebaseUrl)
    .map((response: Response) => {
      this.userProfileData.next(response.json());
    }).catch((error: Response) => {
      return Observable.throw('Something went wrong: ' + error);
    });
  }

  // storeData(userData) {
  //   return this.http.post(this.firebaseUrl, userData);
  // }

  saveData(userData) {
    return this.http.put(this.firebaseUrl, userData) .catch((error: Response) => {
      return Observable.throw('Data not updated on server: ' + error);
    });
  }

}
