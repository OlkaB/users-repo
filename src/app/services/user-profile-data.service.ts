import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserAuthService } from './user-auth.service';



@Injectable()
export class UserProfileDataService {

  userId: string;

  constructor(
    private http: Http,
    private userAuthService: UserAuthService
  ) { }

  getData() {
    const userToken = this.userAuthService.getToken();

    return this.http.get('https://testing-e5b72.firebaseio.com/user' + this.userId.toString() + '.json?auth=' + userToken)
    .map((response: Response) => {
      return response.json();
    }).catch((error: Response) => {
      return Observable.throw('Something went wrong: ' + error);
    });
  }

  createUserId() {
    this.userId = 'user' + Date.now();
    console.log('New user id: ', this.userId);
  }

  storeData(userData) {
    const userToken = this.userAuthService.getToken();
    const url = 'https://testing-e5b72.firebaseio.com/user' + this.userId.toString() + '.json?auth=' + userToken;
    console.log('Store data url with token | userData: ', url, userData);
    return this.http.post(url, userData)
    .catch((error: Response) => {
      return Observable.throw('Something went wrong: ' + error);
    });
  }

  updateData(userData) {
    const url = 'https://testing-e5b72.firebaseio.com/user' + this.userId.toString() + '.json';
    return this.http.put(url, userData);
  }

}
