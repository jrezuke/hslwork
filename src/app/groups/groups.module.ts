import { NgModule }      from '@angular/core';
//import { CommonModule }  from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { GroupsResolver } from './groups.resolver';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent} from './groups.component';
import { GroupsEditComponent } from './groups-edit.component';
import { GroupsNewComponent } from './groups-new.component';
import { GroupsService } from './groups.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [HttpModule, GroupsRoutingModule, SharedModule],
    declarations: [GroupsComponent, GroupsEditComponent, GroupsNewComponent],

    exports: [GroupsComponent]
})

export class GroupsModule {}