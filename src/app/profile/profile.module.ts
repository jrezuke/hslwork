import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { GroupsService } from '../groups/groups.service';

@NgModule({
    imports: [SharedModule, ProfileRoutingModule],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    providers: [ ProfileService, GroupsService, ProfileResolver ]
})

export class ProfileModule { }
