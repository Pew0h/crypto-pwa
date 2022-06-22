import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ProfileComponent} from "./profile/profile.component";
import { CanActivate } from '@angular/router';
import {AuthService} from "./shared/services/auth.service";
import {isConnectedGuard} from "./guards/is-connected.guard";
import {TokenInfoComponent} from "./token-info/token-info.component";

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [isConnectedGuard]},
  { path: 'token/:id', component: TokenInfoComponent, canActivate: [isConnectedGuard]},
  { path: '**', component: DashboardComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
