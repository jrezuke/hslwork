import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { SearchCriteria } from './search-criteria.class';
import { SearchResult } from './search-result.class';
import { SearchService } from './search.service';
import { AccountService } from '../security/account.service';
import { ModalDirective } from 'ngx-bootstrap';

export class NameValue {

    constructor(public name: string,
        public value: string,
        public selected?: boolean) { }
}

@Component({
    moduleId: module.id,
    selector: 'sh-search',
    styleUrls: ['sh-search.component.css'],
    templateUrl: 'sh-search2.component.html',
    providers: [SearchService],
    animations: [
        trigger('visibility', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }),
                animate('.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s 10s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ]),
        trigger('fadder', [
            state('fadein', style({ opacity: 1 })),
            transition('* => *', [
                style({ opacity: 0 }), animate('.5s ease-in')]),
            state('fadeout', style({ opacity: 0 })),
            transition('* => *', [
                style({ opacity: 1 }), animate('.5s ease-out')])
        ])
    ]
})
export class ShSearchComponent implements OnInit {
    state = "in";
    firstSearch = false;
    @Input() title: string = "Use the form below to search for existing profiles";
    @Input() showCheckbox: boolean = false;
    @Input() employeesOnly: boolean = false;
    @Input() showSpinnerOnRowSelected: boolean = false;
    @Input() exclusions: string[];
    @Output() addSelected = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() rowSelected:EventEmitter<string> = new EventEmitter<string>();
    @Output() errorResult:EventEmitter<any> = new EventEmitter<any>();
    @Output() onSubmitEvent:EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('resultModal') resultModal: ModalDirective;

    searchFields: NameValue[] = [
        { name: 'Email Address', value: 'emailAddress' },
        { name: 'First Name', value: 'firstName' },
        { name: 'Last Name', value: 'lastName' },
        { name: 'Username', value: 'username' }
    ];
    filterFields: NameValue[] = [
        { name: 'Email Address', value: 'emailAddress' },
        { name: 'First Name', value: 'firstName' },
        { name: 'Last Name', value: 'lastName' },
        { name: 'Username', value: 'username' },
        { name: 'Display Name', value: 'displayName' }
    ];
    searchCriteria: SearchCriteria;
    searchResults: SearchResult[];

    filterField: NameValue;
    fadeState: string = 'fadein';
    results: Array<any>;
    errorMsg: string;

    constructor(private _searchService: SearchService,
                private _accountService: AccountService) { }

    ngOnInit() {
        //this._searchService.results$.subscribe((resp)=>{console.log("response:", resp)})
        console.log("sh-search.component.ngOnInit");
        console.log("showSpinnerOnRowSelected: ", this.showSpinnerOnRowSelected)
        this.searchCriteria = new SearchCriteria();
        this.searchResults = new Array();
        //this.rowSelected.emit("testing...");
    }

    onRowSelected(result:SearchResult) {
        if (this.showSpinnerOnRowSelected === true) {
            //this._accountService.setShowSpinner(true, "ShSearchComponent.onRowSelected");
        }
        console.log('onRowSelected', result);
        this.rowSelected.emit(result.username);
    }
    onSubmit(form: any) {
        //this._accountService.setShowSpinner(true, "ShSearchComponent.onSubmit");
        this.onSubmitEvent.emit("start");
        this.onClearResults();
        console.log('submitted', JSON.stringify(this.searchCriteria));
        let that = this;

        this._searchService.getSearchResult(this.searchCriteria).subscribe((resp) => {

            for (let i = 0; i < resp.length; i++) {
                let item = resp[i];
                //console.log("item:", item.profile, item.userType);

                if (that.employeesOnly) {
                    if (item.userType === "affiliate") {
                        continue;
                    }
                }

                var result = new SearchResult();
                result.displayName = item.profile.displayName;
                result.username = item.username;
                result.emailAddress = item.profile.emailAddress;
                result.firstName = item.profile.firstName;
                result.lastName = item.profile.lastName;
                result.selected = false;
                //item.selected = false;
                that.searchResults.push(result);

                //console.log('search results', JSON.stringify(that.searchResults));

            }

            //that._accountService.setShowSpinner(false, "ShSearchComponent.onSubmit");
            that.onSubmitEvent.emit("end");
            that.firstSearch = true;
            that.searchResults.sort(function (a: SearchResult, b: SearchResult) {
                    return a.lastName.toLowerCase() == b.lastName.toLocaleLowerCase() ? 0 : +(a.lastName.toLocaleLowerCase() > b.lastName.toLocaleLowerCase()) || -1;
                });

        }, (err: any) => {
            //let jsonError = JSON.parse(err);
            console.log("error:", err);
            //that._accountService.setShowSpinner(false, "ShSearchComponent.onSubmit");
            that.onSubmitEvent.emit("end");
            //that.errorMsg = <any>err;
            that.onErrorResult(err);
            //that.resultModal.show();
        });
        //console.log('results'); //, JSON.stringify(this.searchResults));

    }

    getArrayIndex(array: Array<any>, item: any): number {
        let retVal = -1;

        for (var i = 0; i < array.length; i++) {
            if(array[i].value === item){
                retVal = i;
            }
        }
        return retVal;
    }

    onHeaderCheckboxChange(checked: boolean) {
        console.log("onHeaderCheckboxChange", checked);
        this.searchResults.forEach( function (result, index, artists) {
            console.log('result', result);
            result.selected = checked;
        });
    }

    onRowCheckboxChange(result: SearchResult) {
        console.log("onRowCheckboxChange", result);
        console.log("searchResults", this.searchResults)
    }

    onClearResults() {
        //this._accountService.setShowSpinner(true, "ShSearchComponent.onClearResults");
        this.firstSearch = false;
        this.searchResults = new Array();
        //this._accountService.setShowSpinner(false, "ShSearchComponent.onClearResults");
    }

    onFilterChange(index: number) {
        this.fadeState = 'fadeout';
        console.log('index:', index);
        this.filterField = this.filterFields[index];
        let filterValue = this.filterField.value
        console.log('filter:', this.filterField);

        let that = this;
        setTimeout(function () { that.fadeState = 'fadein'; }, 100)

    }

    onAddSelected() {
        console.log('onAddSelected', this.searchResults);
        let names: string[] = new Array();

        this.searchResults.forEach(function (result, index, artists) {
            if (result.selected) {
                console.log('add', result.username);
                names.push(result.username);
            }
        });
        this.addSelected.emit({ names });
    }

    onCancel() {
        this.cancel.emit();
    }

    onErrorResult(error:any){
        console.log("ShSearchComponent.onErrorResult:", error);
        this.errorResult.emit({error});
    }

}
