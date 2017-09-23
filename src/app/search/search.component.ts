import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { AccountService } from '../security/account.service';


export class NameValue {
    name: string;
    value: string;
    selected: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'ifar-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
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
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class SearchComponent implements OnInit {
    state = "in";
    searchTitle: string = "";
    showCheckbox: boolean = false;
    @ViewChild('resultModal') resultModal: ModalDirective;

    constructor(private _router: Router, private _accountService: AccountService) { }

    onRowSelected(event) {
        console.log("onRowSelected - event", event);
    }
    ngOnInit() {

    }



    onCancel() {
        this._router.navigate(['/home']);
    }

    onErrorResult(error: any) {
        console.log("SearchComponent.onErrorResult:", error);
        this.resultModal.show();
    }

    onSubmitEvent(event) {
        console.log("onSubmitEvent", event);
        if (event === "start") {
            this._accountService.setShowSpinner(true, "SearchComponent.onSubmitEvent");
        }
        else {
            this._accountService.setShowSpinner(false, "SearchComponent.onSubmitEvent")
        }
    }
}
