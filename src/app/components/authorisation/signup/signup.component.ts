import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../../services/user-auth.service';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private userProfileDataService: UserProfileDataService
  ) { }

  ngOnInit() {
  }

  signUpUser(signUpData: NgForm) {
    this.userAuthService.signup(signUpData.value.mail, signUpData.value.password);
    console.log('Signup data: ', signUpData.value.mail, signUpData.value.password);
  }

}
