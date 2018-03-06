import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
  }

  signInUser(signInData: NgForm) {
    const email = signInData.value.mail;
    const password = signInData.value.password;

    this.userAuthService.signIn(email, password);
    console.log('Signin data: ', email, password);
  }

}
