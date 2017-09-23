import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";

import { AuthGuardService } from '../security/auth-guard.service';
import { CanDeactivateGuardService } from '../security/can-deactivate-guard.service';
import { ProfileResolver } from './profile.resolver';

const routes = [
  {
    path: '', component: ProfileComponent,
    resolve: {
        accountProfile: ProfileResolver
      },
      canActivate: [AuthGuardService],
      canDeactivate: [CanDeactivateGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }