import { NgModule }      from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PasswordResetComponent } from './password-reset.component';
import { PasswordRoutingModule } from './password-routing.module';

@NgModule({
    imports: [PasswordRoutingModule, SharedModule],
    declarations: [PasswordResetComponent],
    exports: [PasswordResetComponent]
})

export class PasswordModule {}