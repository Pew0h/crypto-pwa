import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AppService]
})
export class ProfileComponent implements OnInit{
  title = 'angular-pwa';

  public listAlerts: any;
  public imageLink = '';
  constructor(public appService: AppService, private firebase : AngularFirestore, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(){
    this.authService.getAlerts().subscribe(datas => {
      this.listAlerts = datas.filter((data: any) => data.uid === this.authService.getLocalStorageItem('user').uid);
    });

  }

  ngAfterViewChecked(){
    if (this.authService.isLoggedIn){
        this.authService.getCollectionDataByUID('users', this.authService.getLocalStorageItem('user').uid)
          .subscribe((data: any) => this.appService.setPseudo(data.pseudo));
      }else{
        return;
      }
    }
}

