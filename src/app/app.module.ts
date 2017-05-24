import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdSidenavModule, MdButtonModule, MdCheckboxModule } from '@angular/material';

import { FacebookService } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './users/user.service';
import { ImageService } from './images/image.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    NoopAnimationsModule,
    MdSidenavModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  providers: [
    FacebookService,
    UserService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
