import { Component, OnInit, OnDestroy, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { AccountService, UserType } from '../security/account.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'password-reset',
    templateUrl: 'password-reset.component.html',
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
export class PasswordResetComponent implements OnInit {
    //userInfo: UserInfo;
    state = "in";
    emailAddress: string;
    dialog = { title: "", message: "" };
    @ViewChild('resultModal') resultModal: ModalDirective;

    constructor(private _accountService: AccountService, private _router: Router) { }

    ngOnInit() {

     }

     onSubmit(email:string) {
         this._accountService.setShowSpinner(true, "PasswordResetComponent.onSubmit");
         this._accountService.resetPassword(this.emailAddress).subscribe((resp) => {

             console.log("response:", resp);
             this.dialog.title = "Password Reset";
             this.dialog.message = resp.message;
             this._accountService.setShowSpinner(false, "PasswordResetComponent.onSubmit");
             this.resultModal.show();
         },
             (e: any) => {
                 console.log('handled error', e)
                this.dialog.title = "Password Reset";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "PasswordResetComponent.onSubmit");
                this.resultModal.show();
             });

    }

    onCancel() {
        this._router.navigate(['/home']);
    }
}