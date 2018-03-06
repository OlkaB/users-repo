import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UserProfileDataService } from '../../services/user-profile-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  subscription: Subscription;
  userId;
  userData;

  constructor(
    private userProfileDataService: UserProfileDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.userProfileDataService.userProfileData.subscribe((userProfile) => {
      this.userData = userProfile;
      console.log('User data from FireBase: ', this.userData);
      this.profileForm = new FormGroup({
        'firstName': new FormControl(this.userData && this.userData.firstName ? this.userData.firstName : null, Validators.required),
        'lastName': new FormControl(this.userData && this.userData.lastName ? this.userData.lastName : null, Validators.required),
        'phoneNum': new FormControl(this.userData && this.userData.phoneNum ? this.userData.phoneNum : null),
        'birthDate': new FormControl(this.userData && this.userData.birthDate ? this.userData.birthDate : null),
      });
    });
  }

  submitProfileData() {
    this.userProfileDataService.saveData(this.profileForm.value).subscribe(
      response => {
        this.userData = {...this.profileForm.value};
        this.router.navigate(['/wall']);
      },
      error => console.log('Data not stored. ', error)
    );
  }

}
