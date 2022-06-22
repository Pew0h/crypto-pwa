import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {RouterModule} from "@angular/router";
import {AppService} from "./app.service";
import {HttpClientModule} from "@angular/common/http";
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {provideFirebaseApp} from "@angular/fire/app";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { SignInComponent } from './sign-in/sign-in.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AuthService} from "./shared/services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileComponent} from "./profile/profile.component";
import {TokenInfoComponent} from "./token-info/token-info.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SignUpComponent,
    ProfileComponent,
    TokenInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [AppService, AuthService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
