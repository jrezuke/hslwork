import {
    Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';

import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService, Group, GroupReturnObj, MemberDisplay } from './groups.service';
import "rxjs/add/operator/map";
import { AccountService } from '../security/account.service';
import { ModalDirective } from 'ngx-bootstrap';
import { SearchService } from "../shared/search.service";


@Component({
    moduleId: module.id,
    selector: 'groups-edit',
    styleUrls: ['./groups-edit.component.css'],
    templateUrl: 'groups-edit.component.html',
    providers:[SearchService],
    //template: "<h2>groups-edit component</h2>",
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

export class GroupsEditComponent implements OnInit, OnDestroy {
    id: any;
    state = "in";
    private sub: any;
    group: Group;
    membersSelected: { name: string, selected: boolean }[] = new Array();
    showAddNew: boolean = false;
    searchTitle: string = "Use the form below to search for new members:";
    showCheckbox: boolean = true;
    @ViewChild('resultModal') resultModal: ModalDirective;
    dialog = { title: "", message: "" };
    errorMsg: string;
    managedBy: string;
    //members: string[] = new Array();
    searchResultExclusions: string[] = new Array();
    isAdmin = false;

    constructor(private _route: ActivatedRoute,
        private _accountService: AccountService,
        private _router: Router,
        private _groupsService: GroupsService,
        private _searchService: SearchService) { }

    ngOnInit() {
        this.isAdmin = this._accountService.tokenInfo.role.indexOf("administrator") !== -1;
        this.sub = this._route.params.subscribe((params) => {
            this.id = params['id'];
            console.log("Id:", this.id);
            this.group = new Group();
            // if (this._groupsService.currentGroup && this._groupsService.currentGroup.name === this.id) {
            //     this.group = this._groupsService.currentGroup;
            //     console.log("group assigned from groupService.currentGroup", this._groupsService.currentGroup);

            //     this.managedBy = this.group.managedBy.username;
            //     this.setMembersSelected();
            // }
            // else {
                console.log("get the group - http" + this.id);
                //this._accountService.setShowSpinner(true, "");
                this._groupsService.getGroup(this.id)
                    .subscribe((res) => {
                        console.log("response:", res);
                        this.group = res;
                        this._groupsService.currentGroup = new Group();
                        this._groupsService.currentGroup = this.group;
                        this.managedBy = this.group.managedBy.username;
                        this.setMembersSelected();
                        //this._accountService.setShowSpinner(false, "");
                    },
                    (e: any) => {
                        console.log("error:", e);
                        this.dialog.title = "Edit Group";
                        this.dialog.message = e.message;
                        //this._accountService.setShowSpinner(false, "");
                        this.resultModal.show();
                    });
            //}


        })
    }

    onSearchErrorResult(error:any){
        console.log("SearchComponent.onErrorResult:", error);
        this.dialog.title ="No Members Found";
        this.dialog.message = "No members were found for your criteria.";
        this.resultModal.show();
    }

    ngOnDestroy(): void {

    }

    private setMembersSelected() {
        this.membersSelected = new Array();
        let that = this;
        if (this.group.members) {
            this.group.members.forEach(function (member) {
                that.membersSelected.push({ name: member.username, selected: false })
                that.searchResultExclusions.push(member.username);
                //that.members.push(member.username);
            })
        }
    }

    onUpdate() {
        console.log("GroupsEditComponent.onUpdate");

        //TODO do some validation
        let gr = new GroupReturnObj();
        gr.name = this.group.name;
        gr.description = this.group.description;
        gr.managedBy = this.managedBy;

        let newMembers: string[] = this.getNewMemberList();
        console.log("newMembers", newMembers);
        let removeMembers: string[] = this.getRemovedMemberList();
        console.log("removeMembers", removeMembers);

        if ((!newMembers.length) && (!removeMembers.length)) {
            console.log("updateGroupOnly group", gr);
            this.updateGroupOnly(gr);
            return;
        }

        if (newMembers.length && removeMembers.length) {
            console.log("updateGroupAll group, newMembers, removeMembers", gr,newMembers,removeMembers);
            this.updateGroupAll(gr, newMembers, removeMembers);
            return;
        }

        if ((newMembers.length) && (!removeMembers.length)) {
            console.log("updateGroupAndAddMembers group, newMembers", gr,newMembers);

            this.updateGroupAndAddMembers(gr, newMembers);
            return;
        }

        if ((!newMembers.length) && (removeMembers.length)) {
            console.log("updateGroupAndRemoveMembers group, removeMembers", gr,removeMembers);

            this.updateGroupAndRemoveMembers(gr, removeMembers);
            return;
        }
    }

    updateGroupAndRemoveMembers(gr: GroupReturnObj,
        removeMembers: string[]) {

        this._accountService.setShowSpinner(true, "GroupsEditComponent.updateGroupAndRemoveMembers");
        this._groupsService.updateGroupAndRemoveMembers(gr, removeMembers)
            .subscribe((rtObj) => {
                console.log("forkJoin return:", rtObj);
                this.dialog.title = "Update Group";
                this.dialog.message = "The group " + gr.name + " was updated successfully";
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupAndRemoveMembers");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Update Group Error";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupAndRemoveMembers");
                this.resultModal.show();
            });
    }

    updateGroupAndAddMembers(gr: GroupReturnObj,
        newMembers: string[]) {

        this._accountService.setShowSpinner(true, "GroupsEditComponent.updateGroupAndAddMembers");
        this._groupsService.updateGroupAndAddMembers(gr, newMembers)
            .subscribe((rtObj) => {
                console.log("forkJoin return:", rtObj);
                this.dialog.title = "Update Group";
                this.dialog.message = "The group " + gr.name + " was updated successfully";
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupAndAddMembers");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Update Group Error";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupAndAddMembers");
                this.resultModal.show();
            });
    }

    updateGroupAll(gr: GroupReturnObj,
        newMembers: string[], removeMembers: string[]) {
        this._accountService.setShowSpinner(true, "GroupsEditComponent._groupsService.updateGroupAll");

        this._groupsService.updateGroupAll(gr, newMembers, removeMembers)
            .subscribe((rtObj) => {
                console.log("forkJoin return:", rtObj);
                this.dialog.title = "Update Group";
                this.dialog.message = "The group " + gr.name + " was updated successfully";
                this._accountService.setShowSpinner(false, "GroupsEditComponent._groupsService.updateGroupAll");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Update Group Error";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "GroupsEditComponent._groupsService.updateGroupAll");
                this.resultModal.show();
            });
    }

    updateGroupOnly(gr: GroupReturnObj) {
        console.log("GroupsEditComponent.onUpdate");
        this._accountService.setShowSpinner(true, "GroupsEditComponent.updateGroupOnly");

        this._groupsService.updateGroup(gr)
            .subscribe((res) => {
                console.log("GroupsEditComponent.onUpdate response:", res);
                this.dialog.title = "Update Group";
                this.dialog.message = "The group " + gr.name + " was updated successfully";
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupOnly");
                this.resultModal.show();
            },
            (e: any) => {
                console.log("error:", e);
                this.dialog.title = "Update Group Error";
                this.dialog.message = e.message;
                this._accountService.setShowSpinner(false, "GroupsEditComponent.updateGroupOnly");
                this.resultModal.show();
            },
            () => {
                console.log("onUpdate: completed");
            });
    }

    removeMembers(members: string[]) {
        this._groupsService.removeGroupMembers(members)
            .subscribe((res) => {
                console.log("GroupsEditComponent.removeMembers response:", res);
                // this.dialog.title = "Update Group Members";
                // this.dialog.message = "Group was updated successfully";
                // this._accountService.setShowSpinner(false, "");
                // this.resultModal.show();
            },
            (e: any) => {
                console.log("removeMembers error:", e);
                // this.dialog.title = "Update Group Error";
                // this.dialog.message = e.message;
                // this._accountService.setShowSpinner(false, "");
                // this.resultModal.show();
            },
            () => {
                console.log("removeMembers: completed");
                // let newMembers: string[] = this.getNewMemberList();
                // console.log("newMembers", newMembers);
                // this.addNewMembers(newMembers);
            });
    }

    addNewMembers(members: string[]) {
        this._groupsService.addNewGroupMembers(members)
            .subscribe((res) => {
                console.log("GroupsEditComponent.addNewMembers response:", res);
                // this.dialog.title = "Update Group Members";
                // this.dialog.message = "Group was updated successfully";
                // this._accountService.setShowSpinner(false, "");
                // this.resultModal.show();
            },
            (e: any) => {
                console.log("addNewMembers error:", e);
                // this.dialog.title = "Update Group Error";
                // this.dialog.message = e.message;
                // this._accountService.setShowSpinner(false, "");
                // this.resultModal.show();
            },
            () => {
                console.log("addNewMembers: completed");
                // let newMembers: string[] = this.getNewMemberList();
                // console.log("newMembers", newMembers);
                // this.addNewMembers(newMembers);
            });
    }

    private getNewMemberList(): string[] {
        console.log("getNewMemberList");
        let that = this;
        let newMembers: string[] = new Array();
        if (this.membersSelected) {
            this.membersSelected.forEach(function (member) {
                console.log("iterate:member:", member)
                let val = that.group.members.find(m => m.username === member.name);
                if (val) {
                    console.log("in group.members", val);
                }
                else {
                    newMembers.push(member.name);
                    console.log("not in group.members", val);
                }
            })
        }

        return newMembers;
    }

    getRemovedMemberList(): string[] {
        console.log("getRemovedMemberList");
        let that = this;
        let removedMembers: string[] = new Array();
        if (this.group.members) {
            this.group.members.forEach(function (member) {
                console.log("iterate:member:", member);
                let val = that.membersSelected.find(m => m.name === member.username);
                if (val) {
                    console.log("in selectedMembers", val);
                }
                else {
                    removedMembers.push(member.username);
                    console.log("not in selectedMembers", val);
                }

            })
        }
        return removedMembers;
    }

    onCancel() {
        this._router.navigate(['/home']);
    }

    onModalOk() {
        this.resultModal.hide();
        if(this.dialog.title !== "No Members Found"){
            this._router.navigate(['/home']);
        }
    }
    updateCheckedOptions(name: string, event: any) {
        let item = this.membersSelected.find(x => x.name === name);
        item.selected = event.target.checked;

        console.log("membersSelected:", JSON.stringify(this.membersSelected));
    }

    onSelectAll(selected: boolean) {
        for (var x = 0; x < this.membersSelected.length; x++) {
            let item = this.membersSelected[x];
            item.selected = selected;
        }
        console.log("membersSelected:", JSON.stringify(this.membersSelected));
    }

    onDeleteSelected() {
        let i = this.membersSelected.length;
        while (i--) {
            let item = this.membersSelected[i];
            if (item.selected) {
                this.membersSelected.splice(i, 1);
                this.removeExclusion(item.name);
            }
        }
        console.log("membersSelected:", JSON.stringify(this.membersSelected));
    }

    removeExclusion(ex:string) {
        let index = -1;
        for (let i = 0; i < this.searchResultExclusions.length; i++){
            if (this.searchResultExclusions[i] === ex) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            this.searchResultExclusions.splice(index, 1);
        }
    }

    onAddNew() {
        this.showAddNew = true;
    }

    onAddSelected(searchResults: any) {
        console.log("add selected", searchResults);
        for (let i = 0; i < searchResults.names.length; i++) {
            let result = searchResults.names[i];
            console.log('result', result);
            if (this.membersSelected.find ((mem) => {
                return mem.name === result;
            })) {
                alert(result + " is already a member.");
            }
            else{
                this.membersSelected.push({ name: searchResults.names[i], selected: false });
                this.searchResultExclusions.push(searchResults.names[i]);
            }
        }
        this.showAddNew = false;
    }

    onAddNewClose() {
        this.showAddNew = false;
    }

    onReset() {
        this.setMembersSelected();
    }

    onDownload() {
        console.log("onDownload");
        let names:string[] = new Array();
        this.membersSelected.forEach(val => {
            console.log("onDownload val", val);
            names.push(val.name);
        });

        this._searchService.getMembersInfo(names)
            .subscribe(res => {
                let membersDisplay: MemberDisplay[] = new Array();
                console.log("res", res);
                for (let i = 0; i < res.length; i++){
                    let md = new MemberDisplay();
                    md.username = res[i][0].username;
                    md.email = res[i][0].profile.emailAddress;
                    md.name = res[i][0].profile.displayName;
                    membersDisplay.push(md);
                }
                console.log("membersDisplay:", membersDisplay);
                let csv = this.convertToCSV(membersDisplay);
                console.log("csv:", csv);
                var blob = new Blob([csv], { type: 'text/csv' });
                var url = window.URL.createObjectURL(blob);
                console.log("url:", url);
                window.open(url);
            });
    }

    convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
      }

}