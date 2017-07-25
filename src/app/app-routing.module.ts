import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { LoggedComponent } from './components/logged.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logged', component: LoggedComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
