import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EqualValidator } from '../directives/validate-password.directive';
import { ShSearchComponent } from './sh-search.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip'

@NgModule({
  imports: [ CommonModule, FormsModule, HttpModule, ModalModule.forRoot(), TooltipModule.forRoot(),  ],
  declarations: [ShSearchComponent, EqualValidator   ],
  exports: [ModalModule, TooltipModule, ShSearchComponent, CommonModule,
    FormsModule, EqualValidator, HttpModule]

})
export class SharedModule {}
