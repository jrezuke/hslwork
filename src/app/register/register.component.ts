import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { AccountService, GenericUser, UserType } from '../security/account.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'ifar-register',
    styleUrls: ['register.component.css'],
    templateUrl: 'register.component.html',
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
export class RegisterComponent implements OnInit {
    //userInfo: UserInfo;
    state = "in";
    emailAddress: string;
    genericUser: GenericUser;
    errorMsg: string;
    @ViewChild('resultModal') resultModal: ModalDirective;

    constructor(private _accountService: AccountService,
        private _router: Router, private _registerService: RegisterService) { }

    ngOnInit() {
        //this.userInfo = new UserInfo();
        console.log("RegisterComponent.ngOnInit accountService.currentUser authenticated:", JSON.stringify(this._accountService.isUserAuthenticated()));
    }

    onSubmit(form: any) {
        console.log('submitted', this.emailAddress);
        let userType = "";
        let that = this;
        this._accountService.getUserType(this.emailAddress).subscribe((resp) => {
            userType = resp;
            console.log("response:", resp);

            if (userType === "employee") {
                //this.userInfo.userType === UserType.Employee;
                //this._accountService.setCurrentUser(this.userInfo);
                //this._router.navigate(['/register/employee/confirmed'])
                this.registerEmployee();
            }
            else {
                //this.userInfo.userType === UserType.Affiliate;
                //this._accountService.setCurrentUser(this.userInfo);
                this._registerService.emailAddress = this.emailAddress;
                this._router.navigate(['/register/affiliate'])
            }
        },
            (e: any) => console.log('error', e));
    }

    registerEmployee() {
        this._accountService.setShowSpinner(true, "RegisterComponent.registerEmployee");
        console.log('registerEmployee: ', this.emailAddress);
        this.genericUser = new GenericUser();
        this.genericUser.account.userType = "employee";
        this.genericUser.profile.emailAddress = this.emailAddress;

        let that = this;
        this._accountService.registerNewUser(this.genericUser)
            .subscribe(res => {
                console.log("response:", res);
                that._accountService.setShowSpinner(false, "RegisterComponent.registerEmployee");
                that._router.navigate(['/register/employee/confirmed']);
            },
            (e: any) => {
                that._accountService.setShowSpinner(false, "RegisterComponent.registerEmployee");
                console.log('error', e);
                that.errorMsg = e;
                that.resultModal.show();
            });
    }

    onCancel() {
        this._router.navigate(['/home']);
    }
}