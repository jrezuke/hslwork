import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";

import { RegisterComponent } from "./register.component";
import { RegisterEmployeeConfirmedComponent } from './register-employee-confirmed.component';
import { RegisterAffiliateComponent } from './register-affiliate.component';
import { RegisterAffiliateConfirmedComponent } from './register-affiliate-confirmed.component';

const routes = [
    { path: '', component: RegisterComponent },
    { path: 'employee/confirmed', component: RegisterEmployeeConfirmedComponent },
    { path: 'affiliate', component: RegisterAffiliateComponent },
    { path: 'affiliate/confirmed', component: RegisterAffiliateConfirmedComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRoutingModule { }