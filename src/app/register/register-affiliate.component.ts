import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { AccountService, GenericUser, UserType } from '../security/account.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EqualValidator } from '../directives/validate-password.directive';
import { RegisterService } from './register.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'register-affiliate',
    templateUrl: 'register-affiliate.component.html',
    animations: [
        trigger('visibility', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class RegisterAffiliateComponent implements OnInit {
    state = "in";
    confirmPwd: string;
    genericUser: GenericUser;
    errorMsg: string;
    @ViewChild('resultModal') resultModal: ModalDirective;

    constructor(private _accountService: AccountService,
        private _router: Router, private _registerService: RegisterService) { }

    ngOnInit() {
        this.genericUser = new GenericUser();
        this.genericUser.profile.emailAddress = this._registerService.emailAddress;
        console.log("RegisterAffiliateComponent.ngOnInit genericUser:", this.genericUser);
     }

    onSubmit(form: any) {
        this._accountService.setShowSpinner(true, "RegisterAffiliateComponent.onSubmit");
        console.log('submitted', JSON.stringify(this.genericUser));
        this.genericUser.account.userType === "Affiliate";
        this.genericUser.profile.displayName = this.genericUser.profile.firstName
            + " " + this.genericUser.profile.lastName;

        this._accountService.registerNewUser(this.genericUser)
            .subscribe(res => {
                console.log("response:", res);
                this._accountService.setShowSpinner(false, "RegisterAffiliateComponent.onSubmit");
                this._router.navigate(['/register/affiliate/confirmed']);
            },
            (e: any) => {
                console.log('error:', e);
                this._accountService.setShowSpinner(false, "RegisterAffiliateComponent.onSubmit");
                this.errorMsg = e;
                this.resultModal.show();
            });
        //
    }

    onCancel() {
        this._router.navigate(['/home']);
    }


}