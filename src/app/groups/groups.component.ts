import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService, Group, UserGroupType } from './groups.service';
import { AccountService } from '../security/account.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'ifar-groups',
    templateUrl: 'groups.component.html',
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

export class GroupsComponent implements OnInit {
    state = "in";
    group: Group;
    isAdmin = false;

    @ViewChild('resultModal') resultModal: ModalDirective;
    dialog = { title: "", message: "" };
    errorMsg: string;


    constructor(private _router: Router,
        private _groupsService: GroupsService,
        private _accountService: AccountService) { }

    ngOnInit() {
        this.group = new Group();
        this.isAdmin = this._accountService.tokenInfo.role.indexOf("administrator") !== -1;
    }
    onNewGroup() {
        this._router.navigate(['/groups/new']);
    }

    onSubmit(form: FormGroup) {
        console.log("GroupsComponent onSubmit");
        let role = this._accountService.tokenInfo.role;
        //let memberType = this.getMemberType(role);

        if (this._accountService.tokenInfo.role.indexOf("affiliates") !== -1) {
            this.dialog.title = "Groups";
            this.dialog.message = "Affiliate users are not permitted to manage custom user groups.";
            this.resultModal.show();
        }
        else {
            this._accountService.setShowSpinner(true, "GroupsComponent.onSubmit");
            console.log('submitted', JSON.stringify(this.group.name));
            this._groupsService.getGroup(this.group.name)
                .subscribe((res:any) => {
                    //console.log("response:", res);

                    this._accountService.setShowSpinner(false, "GroupsComponent.onSubmit");
                    this._groupsService.currentGroup = new Group();
                    this._groupsService.currentGroup = res;
                    console.log("group:", this._groupsService.currentGroup);

                    this._router.navigate(['/groups', this.group.name]);
            },
            (e: any) => {
                console.log('error:', e);
                this._accountService.setShowSpinner(false, "GroupsComponent.onSubmit");
                this.dialog.title = "Groups";
                this.dialog.message = e.message;
                this.resultModal.show();
            });
        }
    }

    // private getMemberType(role:string[]): string {
    //     if (Array.isArray(role))
    //     {
    //         for (let i = 0; i < role.length; i++){
    //             if (role[i].toLowerCase() === "affiliates") {
    //                 return "affiliates";
    //             }
    //         }
    //     }
    //     else {
    //         if (role.toLowerCase() === "affiliates"){
    //                 return "affiliates";
    //             }
    //     }
    //     return "employees";
    // }

    onCancel() {
        this._router.navigate(['/home']);
    }

    onModalOk() {
        this.resultModal.hide();
        //this._router.navigate(['/home']);
    }
}