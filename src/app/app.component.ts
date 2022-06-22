import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import './shared/services/smtp.js';
declare let Email: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  title = 'angular-pwa';

  public tokens: any = [];
  public users: Observable<any[]> | undefined;
  constructor(private appService: AppService, private firebase : AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit(){
    //this.sendEmail();
    this.appService.getTokens().subscribe(data =>{
      this.tokens = data;
    });
  }

  public sendEmail(){
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'email@gmail.com',
      Password : 'password',
      To : 'pewoh@@gmail.com',
      From : 'email@gmail.com',
        Subject : 'Test objet',
        Body : 'test'
    }).then((s: any) => console.log(s)).catch((e: any) => console.log(e));
  }
}

