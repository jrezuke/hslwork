import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, trigger, transition, } from '@angular/animations';
import { Router, NavigationStart, NavigationEnd, NavigationExtras, ActivatedRoute, UrlSegment } from '@angular/router';
import { AccountService } from "./security/account.service";
import { OAuthService } from './security/o-auth.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('sideBarVisibility', [
      state('show', style({ opacity: '1', width: '*', display: 'block' })),
      state('hide', style({ opacity: '0', width: '0px', display: 'none' })),
      transition('show <=> hide', [animate(250)])
    ])
  ]
})
export class AppComponent implements OnInit,OnDestroy {
  state: string = 'show';
  _accountService: AccountService;
  hash: string;
  previousPath: string;
  currentPath: string;
  showSideNav: boolean;
  showSpinner: boolean;
  //spinnerSubscription: Subscription;

  constructor(accountService: AccountService,
    private _oauthService: OAuthService,
    private _router: Router,


  ) {
    this._accountService = accountService;
  }
  ngOnDestroy() {
    //this.spinnerSubscription.unsubscribe();
  }

  ngOnInit() {
    // this.spinnerSubscription = this._accountService.showSpinner$.subscribe((state) => {
    //   this.showSpinner = state;
    //   console.log("AppComponent showSpinner change", this.showSpinner);
    // }) ;

    if (window.location.hash) {
      //console.log("window.location.hash:", window.location.hash);
      this.hash = window.location.hash;
      //console.log("window.location.hash:", this.hash);
      if (this.hash.startsWith("#id_token")) {
        this._oauthService.ServerCallback();
        if (this._oauthService.IsAuthorized) {
          this._accountService.setUserAuthorized(true);
        }
      }
    }

    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        //this._accountService.setShowSpinner(true, "");
        console.log("appComponent.ngInit.this._router.events.subscribe NavigationStart-event:", event);
        //this.onPathChange(event.url);
      }
      if (event instanceof NavigationEnd) {
        this._accountService.setShowSpinner(false, "appComponent.NavigationEnd");
        console.log("appComponent.ngInit.this._router.events.subscribe NavigationEnd-event:", event);
        this.onPathChange(event.url);
      }
    });
  }

  onPathChange(path: string) {
    console.log("app.component onPathChange current path:", path);
    if (this.currentPath) {
      this.previousPath = this.currentPath;
      console.log("app.component onPathChange previous path:", this.previousPath);
    }

    this.currentPath = path;

    if (this.currentPath.startsWith("/home") || this.currentPath === "/") {
      this.showSideNav = true;
      this.state = "show";
    }
    else {
      this.showSideNav = false;
      this.state = "hide";
    }

  }
  onLogon() {
    //this._accountService.setUserAuthorized(true);
    localStorage.setItem("ifar-redirecturl", "");
    this._oauthService.Authorize();
  }

  onLogout() {
    this._oauthService.Logoff();
  }

  onStateChange() {
    if (this.state === 'show') {
      this.state = 'hide'
    }
    else {
      this.state = 'show'
    }
  }


}
