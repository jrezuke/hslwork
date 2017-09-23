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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var password_reset_component_1 = require('./password-reset.component');
var password_routing_module_1 = require('./password-routing.module');
var PasswordModule = (function () {
    function PasswordModule() {
    }
    PasswordModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, password_routing_module_1.PasswordRoutingModule],
            declarations: [password_reset_component_1.PasswordResetComponent],
            exports: [password_reset_component_1.PasswordResetComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PasswordModule);
    return PasswordModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PasswordModule;
//# sourceMappingURL=password.module.js.map