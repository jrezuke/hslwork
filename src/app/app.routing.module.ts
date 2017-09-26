import { NgModule} from '@angular/core';
import { RouterModule, PreloadAllModules, PreloadingStrategy } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './notAuthorized/not-authorized.component';
import { BlankComponent } from './blank.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { GroupsComponent } from './groups/groups.component';
import { PasswordResetComponent } from './password/password-reset.component';
import { AuthGuardService } from './security/auth-guard.service';
import { GroupsNewComponent } from './groups/groups-new.component';
import { NewGroupGuardService } from './security/new-group-guard.service';
import { GroupsEditComponent } from './groups/groups-edit.component';
import { ProfileResolver } from './profile/profile.resolver';
import { RegisterEmployeeConfirmedComponent } from './register/register-employee-confirmed.component';
import { RegisterAffiliateComponent } from './register/register-affiliate.component';
import { RegisterAffiliateConfirmedComponent } from './register/register-affiliate-confirmed.component';

const routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '', component: BlankComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent,
      children:[
        { path: 'employee/confirmed', component: RegisterEmployeeConfirmedComponent },
        { path: 'affiliate', component: RegisterAffiliateComponent },
        { path: 'affiliate/confirmed', component: RegisterAffiliateConfirmedComponent }
      ] },
    { path: 'profile', component: ProfileComponent, resolve:{accountProfile: ProfileResolver},canActivate: [AuthGuardService] },
    { path: 'search', component: SearchComponent },
    { path: 'groups', component: GroupsComponent, canActivate: [AuthGuardService],
      children:[
        {path: ':id', component: GroupsEditComponent}
      ] },
     {path: 'groups/new', component: GroupsNewComponent, canActivate: [NewGroupGuardService]},
    { path: 'reset', component: PasswordResetComponent },
    { path: 'not-authorized', component: NotAuthorizedComponent },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })


  export class AppRoutingModule {};