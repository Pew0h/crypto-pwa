import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {formatDate, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SymfonyEmailValidator} from "../validators/symfony-email.validator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

registerLocaleData(localeFr, 'fr')
@Component({
  selector: 'app-root',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.css'],
  providers: [AppService]
})
export class TokenInfoComponent implements OnInit{
  title = 'angular-pwa';

  public token: any | null = '';
  public tokenId: string | null = '';
  public formToken: FormGroup;

  constructor(public appService: AppService, private fb: FormBuilder, private firebase : AngularFirestore, private route: ActivatedRoute, public authService: AuthService, public toastr: ToastrService, public router: Router) {
    this.formToken = this.fb.group({
      name: ['', [Validators.required]],
      type: ['equal', Validators.required],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.tokenId = this.route.snapshot.paramMap.get('id')
    this.appService.getTokenInfo(this.tokenId).subscribe(data =>{
      this.token = data;
    });
  }

  ngAfterViewChecked(){
    if (this.authService.isLoggedIn){
      this.authService.getCollectionDataByUID('users', this.authService.getLocalStorageItem('user').uid)
        .subscribe((data: any) => this.appService.setPseudo(data.pseudo));
    }
  }

  public dateToFrFormat(date: string){
    return formatDate(date, 'dd/MM/yyyy', 'fr');
  }

  get f() {
    return this.formToken.controls;
  }

  public submit(){
    if (this.formToken.valid) {
        this.authService.createAlert(this.authService.getLocalStorageItem('user').uid, this.f.name.value, this.f.type.value, this.f.price.value, this.tokenId).then(() => {
          this.toastr.success('Création de l\'alerte avec succès');
          this.router.navigate(['profile']).then(() => window.location.reload());
        });
    }

     else {
      this.formToken.markAllAsTouched();
      this.toastr.error('Veuillez remplir tous les champs');
    }
  }
}

