import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AppService]
})
export class DashboardComponent implements OnInit {
  title = 'angular-pwa';

  public tokens: any = [];
  public users: Observable<any[]> | undefined;
  public page = 1;
  public count = 0;
  public pageSize = 24;
  public pseudo = '';

  constructor(public appService: AppService, public authService: AuthService) {
  }

  ngOnInit() {
    this.appService.getTokens().subscribe(data => {
      this.tokens = data;
    });
  }

  ngAfterViewChecked() {
    if (this.authService.isLoggedIn) {
      this.authService.getCollectionDataByUID('users', this.authService.getLocalStorageItem('user').uid)
        .subscribe((data: any) => this.appService.setPseudo(data.pseudo));
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
  }
}
