import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EqualValidator } from './directives/validate-password.directive';
import { ShSearchComponent } from './shared/sh-search.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlankComponent } from "./blank.component";

import { GroupsComponent} from './groups/groups.component';
import { GroupsEditComponent } from './groups/groups-edit.component';
import { GroupsNewComponent } from './groups/groups-new.component';

import { AccountService } from "./security/account.service";
import { OAuthService } from './security/o-auth.service';
import { RegisterService } from './register/register.service';
import { AuthGuardService } from './security/auth-guard.service';
import { CanDeactivateGuardService } from './security/can-deactivate-guard.service';
import { GroupsResolver } from './groups/groups.resolver';
import { GroupsService } from './groups/groups.service';


import { AppConfig } from "./app.config";
import { FooterComponent } from "./footer/footer.component";
import { NewGroupGuardService } from './security/new-group-guard.service';
import { NotAuthorizedComponent } from './notAuthorized/not-authorized.component';
import { PasswordResetComponent } from './password/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { ProfileResolver } from './profile/profile.resolver';
import { RegisterComponent } from './register/register.component';
import { RegisterAffiliateComponent } from './register/register-affiliate.component';
import { RegisterAffiliateConfirmedComponent } from './register/register-affiliate-confirmed.component';
import { RegisterEmployeeConfirmedComponent } from './register/register-employee-confirmed.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    AppComponent,
    HomeComponent,
    BlankComponent,
    FooterComponent,
    NotAuthorizedComponent,
    ShSearchComponent,
    GroupsComponent,
    GroupsEditComponent,
    GroupsNewComponent,
    PasswordResetComponent,
    ProfileComponent,
    RegisterComponent,
    RegisterAffiliateComponent,
    RegisterAffiliateConfirmedComponent,
    RegisterEmployeeConfirmedComponent,
    SearchComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [AccountService,
    AppConfig,
    OAuthService,
    RegisterService,
    CanDeactivateGuardService,
    AuthGuardService,
    GroupsResolver,
    GroupsService,
    ProfileService,
    ProfileResolver,
    NewGroupGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
