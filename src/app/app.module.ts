import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routes/routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/*
* SERVICES
*/
import { UserAuthService } from './services/user-auth.service';
import { UserProfileDataService } from './services/user-profile-data.service';
import { RouteAuthGuardService } from './routes/route-auth-guard.service';

/*
* COMPONENTS
*/
import { AppComponent } from './app.component';
import { SignupComponent } from './components/authorisation/signup/signup.component';
import { SigninComponent } from './components/authorisation/signin/signin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PageMenuComponent } from './components/page-menu/page-menu.component';
import { UserWallComponent } from './components/user-wall/user-wall.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent,
    PageMenuComponent,
    UserWallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    UserAuthService,
    UserProfileDataService,
    RouteAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
