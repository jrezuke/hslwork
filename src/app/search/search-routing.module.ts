import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";

import { SearchComponent } from './search.component';

const routes = [
    { path: '', component: SearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule { }