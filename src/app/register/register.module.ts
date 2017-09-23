import { NgModule }      from '@angular/core';
//import { HttpModule} from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterAffiliateComponent } from './register-affiliate.component';
import { RegisterAffiliateConfirmedComponent } from './register-affiliate-confirmed.component';
import { RegisterEmployeeConfirmedComponent } from './register-employee-confirmed.component';



@NgModule({
    imports: [SharedModule, RegisterRoutingModule],
    declarations: [
        RegisterComponent,
        RegisterEmployeeConfirmedComponent,
        RegisterAffiliateComponent,
        RegisterAffiliateConfirmedComponent
        ],
    exports: [RegisterComponent],
    providers: []
})
export class RegisterModule {}