import { NgModule }      from '@angular/core';
import { HttpModule} from '@angular/http';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [HttpModule, SearchRoutingModule, SharedModule],
    declarations: [SearchComponent],
    exports: [SearchComponent ]
})

export class SearchModule {}