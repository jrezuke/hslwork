import { NgModule} from '@angular/core';
import { RouterModule, PreloadAllModules, PreloadingStrategy } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './notAuthorized/not-authorized.component';
import { BlankComponent } from './blank.component';

const routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '', component: BlankComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
    { path: 'register', loadChildren: 'app/register/register.module#RegisterModule' },
    { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
    { path: 'search', loadChildren: 'app/search/search.module#SearchModule' },
    { path: 'groups', loadChildren: 'app/groups/groups.module#GroupsModule' },
    { path: 'password', loadChildren: 'app/password/password.module#PasswordModule' },
    { path: 'not-authorized', component: NotAuthorizedComponent },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })


  export class AppRoutingModule {};