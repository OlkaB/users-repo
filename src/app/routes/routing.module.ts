import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuthGuardService } from './route-auth-guard.service';

import { SignupComponent } from '../components/authorisation/signup/signup.component';
import { SigninComponent } from '../components/authorisation/signin/signin.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { UserWallComponent } from '../components/user-wall/user-wall.component';


const appRoutes: Routes = [
  {path: 'signIn', component: SigninComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [RouteAuthGuardService]},
  {path: 'wall', component: UserWallComponent, canActivate: [RouteAuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule { }
