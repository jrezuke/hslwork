"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { CommonModule }  from '@angular/common';
//import { FormsModule } from '@angular/forms';
var http_1 = require('@angular/http');
var register_routing_module_1 = require('./register-routing.module');
var register_component_1 = require('./register.component');
var register_affiliate_component_1 = require('./register-affiliate.component');
var register_affiliate_confirmed_component_1 = require('./register-affiliate-confirmed.component');
var register_employee_confirmed_component_1 = require('./register-employee-confirmed.component');
var shared_module_1 = require('../shared/shared.module');
var RegisterModule = (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, http_1.HttpModule, register_routing_module_1.RegisterRoutingModule],
            declarations: [
                register_component_1.RegisterComponent,
                register_employee_confirmed_component_1.RegisterEmployeeConfirmedComponent,
                register_affiliate_component_1.RegisterAffiliateComponent,
                register_affiliate_confirmed_component_1.RegisterAffiliateConfirmedComponent
            ],
            exports: [register_component_1.RegisterComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterModule);
    return RegisterModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterModule;
//# sourceMappingURL=register.module.js.map