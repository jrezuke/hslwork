import { Component, OnInit, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { OAuthService } from '../security/o-auth.service';

@Component({
    moduleId: module.id,
    selector: 'register-employee-confirmed',
    templateUrl: 'register-employee-confirmed.component.html',
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
export class RegisterEmployeeConfirmedComponent implements OnInit {
    state = "in";
    constructor(private _oauthService: OAuthService) { }

    ngOnInit() { }

    onLogin() {
        //security servcie login
        console.log("Logging in");
        localStorage.setItem("ifar-redirecturl", "");
        this._oauthService.Authorize();
    }

}