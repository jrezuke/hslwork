import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";

import { GroupsComponent } from './groups.component';
import { GroupsEditComponent } from './groups-edit.component';
import { GroupsNewComponent } from './groups-new.component';
import { AuthGuardService } from '../security/auth-guard.service';
import { NewGroupGuardService } from "app/security/new-group-guard.service";

const routes = [
  {
    path: '', component: GroupsComponent, canActivate: [AuthGuardService]
  },
      {
        path: 'new', component: GroupsNewComponent, canActivate: [NewGroupGuardService]
      },
      {
        path: ':id', component: GroupsEditComponent
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
export class GroupsRoutingModule { }