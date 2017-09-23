import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';
@Component({
    moduleId: module.id,
    selector: 'ifar-about',
    styleUrls: ['about.component.css'],
    templateUrl: 'about.component.html',
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
export class AboutComponent implements OnInit, OnDestroy {
    state: string = 'hide';
    constructor() { }

    ngOnInit() {

    }

    ngOnDestroy() {
        // let that = this;
        // setTimeout(function () {
        //     that.state = "hide";
        // },
        //     1000);
    }
}