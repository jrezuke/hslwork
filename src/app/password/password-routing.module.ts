import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";

import { PasswordResetComponent } from './password-reset.component';

const routes = [
    { path: 'reset', component: PasswordResetComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PasswordRoutingModule { }