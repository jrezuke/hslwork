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
var router_1 = require("@angular/router");
var register_component_1 = require("./register.component");
var register_employee_confirmed_component_1 = require('./register-employee-confirmed.component');
var register_affiliate_component_1 = require('./register-affiliate.component');
var register_affiliate_confirmed_component_1 = require('./register-affiliate-confirmed.component');
var routes = [
    { path: '', component: register_component_1.RegisterComponent },
    { path: 'employee/confirmed', component: register_employee_confirmed_component_1.RegisterEmployeeConfirmedComponent },
    { path: 'affiliate', component: register_affiliate_component_1.RegisterAffiliateComponent },
    { path: 'affiliate/confirmed', component: register_affiliate_confirmed_component_1.RegisterAffiliateConfirmedComponent }
];
var RegisterRoutingModule = (function () {
    function RegisterRoutingModule() {
    }
    RegisterRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterRoutingModule);
    return RegisterRoutingModule;
}());
exports.RegisterRoutingModule = RegisterRoutingModule;
//# sourceMappingURL=register-routing.module.js.map