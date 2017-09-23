import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationExtras } from '@angular/router';
import { AccountService } from './security/account.service';

//the reason for this component is to receive the callback from identity server
@Component({
    moduleId: module.id,
    selector: 'ifar-blank',
    template: ''
})
export class BlankComponent implements OnInit {
    hash: string;
    constructor(private _router: Router,
        private _accountService: AccountService) { }

    ngOnInit() {
        console.log("BlankComponent ngOnInit");
        if (window.location.hash) {
            this.hash = window.location.hash;

            if (this.hash.startsWith("#id_token")) {
                if (this._accountService.isUserAuthenticated()) {
                    let redirectUrl:string = localStorage.getItem("ifar-redirecturl");
                    if (redirectUrl) {
                        this._router.navigate([redirectUrl]);
                        return;
                    }
                }
                //this._router.navigate(['/home'])
            }
        }
        this._router.navigate(['/home'])
    }

}