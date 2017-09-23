import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { OAuthService } from '../security/o-auth.service';

@Component({
    moduleId: module.id,
    selector: 'affiliate-confirmed',
    templateUrl: 'register-affiliate-confirmed.component.html',
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
export class RegisterAffiliateConfirmedComponent implements OnInit {
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