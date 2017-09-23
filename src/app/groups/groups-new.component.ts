import {
    Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService, GroupReturnObj } from './groups.service';
import "rxjs/add/operator/map";
import { AccountService } from '../security/account.service';
import { ModalDirective } from 'ngx-bootstrap';

import { SearchCriteria } from '../shared/search-criteria.class';
import { SearchService } from '../shared/search.service';
import { SearchResult } from '../shared/search-result.class';

@Component({
    moduleId: module.id,
    selector: 'groups-new',
    templateUrl: 'groups-new.component.html',
    styleUrls: ['./groups-new.component.css'],
    providers:[SearchService],
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
export class GroupsNewComponent implements OnInit {
    state = "in";
    showCheckbox = false;
    showSearch = false;
    group: GroupReturnObj;
    searchCriteria: SearchCriteria;
    searchResults: SearchResult[];
    @ViewChild('resultModal') resultModal: ModalDirective;
    dialog = { title: "", message: "" };
    isError = false;
    errorMsg: string;
    employeesList: string[];
    selectedOwner: string;

    constructor(private _groupsService: GroupsService,
        private _router: Router, private _accountService: AccountService,
        private _searchService: SearchService
    ) { }

    ngOnInit() {
        this.group = new GroupReturnObj();
        // this.searchCriteria = new SearchCriteria();
        // this.employeesList = new Array();

        // this.searchCriteria.searchField = name;
        // this.searchCriteria.searchFor = "*"

        // let that = this;
        // this._searchService.getSearchResult(this.searchCriteria).subscribe((resp) => {
        //     console.log("resp: ", resp);

        //     resp.forEach(function (item: any) {
        //         console.log("item:", item.profile, item.userType);

        //         if (item.userType === "affiliate") {
        //             return;
        //         }

        //         that.employeesList.push(item.username);

        //     });
        //     console.log("emp list: ", this.employeesList.sort());
        // }, (err: any) => {
        //     // that._accountService.setShowSpinner(false, "");
        //     // that.errorMsg = <any>err;
        //     // that.resultModal.show();
        // });
    }

    onSubmit() {
        this._accountService.setShowSpinner(true, "GroupsNewComponent.onSubmit");
        console.log("onSubmit - group:", this.group);
        this._groupsService.addGroup(this.group)
            .subscribe((res) => {
                console.log("onSubmit response:", res);
                this.dialog.title = "Add Group";
                this.dialog.message = "The group " + this.group.name + " was added successfully";
                this._accountService.setShowSpinner(false, "GroupsNewComponent.onSubmit");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Edit Group";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "GroupsNewComponent.onSubmit");
                this.isError = true;
                this.resultModal.show();
            });
    }

    onShowSearch() {
        this.showSearch = true;
    }
    onSearchCancel() {
        console.log("onSearchCancel");
        this.showSearch = false;
    }

    onRowSelected(username: string) {
        console.log("onRowSelected", username);
        this.group.managedBy = username;
        this.showSearch = false;
        this._accountService.setShowSpinner(false, "GroupsNewComponent.onRowSelected");
    }

    onModalCancel() {
        console.log("onModalCancel");
        this._router.navigate(['/home']);
    }

    onModalOk() {
        this.resultModal.hide();
        if (!this.isError) {
            this._router.navigate(['/groups', this.group.name]);
        }
    }
}
