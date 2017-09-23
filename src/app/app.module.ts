import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlankComponent } from "./blank.component";

import { AccountService } from "./security/account.service";
import { OAuthService } from './security/o-auth.service';
import { RegisterService } from './register/register.service';
import { AuthGuardService } from './security/auth-guard.service';
import { CanDeactivateGuardService } from './security/can-deactivate-guard.service';
import { GroupsResolver } from './groups/groups.resolver';
import { GroupsService } from './groups/groups.service';

import { SharedModule } from './shared/shared.module';
import { AppConfig } from "./app.config";
import { FooterComponent } from "./footer/footer.component";
import { NewGroupGuardService } from './security/new-group-guard.service';
import { NotAuthorizedComponent } from './notAuthorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlankComponent,
    FooterComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, SharedModule
  ],
  providers: [AccountService,
    AppConfig,
    OAuthService,
    RegisterService,
    CanDeactivateGuardService,
    AuthGuardService,
    GroupsResolver,
    GroupsService,
    NewGroupGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
