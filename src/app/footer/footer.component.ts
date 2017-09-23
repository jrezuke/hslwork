import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ifar-footer',
    templateUrl: 'footer.component.html'
})
export class FooterComponent implements OnInit {
    todayYear: number;

    constructor() { }

    ngOnInit() {
        this.todayYear = new Date().getFullYear();
     }

}
