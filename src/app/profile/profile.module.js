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
var shared_module_1 = require('../shared/shared.module');
var profile_routing_module_1 = require('./profile-routing.module');
var profile_component_1 = require('./profile.component');
var profile_service_1 = require('./profile.service');
var profile_resolver_1 = require('./profile.resolver');
var groups_service_1 = require('../groups/groups.service');
var ProfileModule = (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, profile_routing_module_1.ProfileRoutingModule],
            declarations: [profile_component_1.ProfileComponent],
            exports: [profile_component_1.ProfileComponent],
            providers: [profile_service_1.ProfileService, groups_service_1.GroupsService, profile_resolver_1.ProfileResolver]
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileModule);
    return ProfileModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileModule;
//# sourceMappingURL=profile.module.js.map