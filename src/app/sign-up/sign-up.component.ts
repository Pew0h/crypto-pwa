import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {EmailValidator, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SymfonyEmailValidator} from "../validators/symfony-email.validator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public formSignUp: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, public toastr: ToastrService, public router: Router) {
    this.formSignUp = this.fb.group({
      email: ['', [Validators.required, SymfonyEmailValidator]],
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.formSignUp.controls;
  }

  public submit(){
    if (this.formSignUp.valid) {
      if (this.f.password.value !== this.f.password2.value){
        this.toastr.error('Les mots de passes ne sont pas identiques');
        return;
      }
      this.authService.SignUp(this.f.email.value, this.f.password.value, this.f.pseudo.value).then(() => {
        if(localStorage.getItem("user") == null){
          this.toastr.error('Email déjà utilisé');
          return;
        }
        this.router.navigate(['sign-in']).then(() => window.location.reload());
      });
    } else {
      if(this.f.password.value.length < 6 || this.f.password2.value.length < 6){
        this.toastr.error('Le mot de passe doit faire minimum 6 caractères');
      } else if(SymfonyEmailValidator(this.f.email)){
        this.toastr.error('Le format de l\'email est invalide');
      }
      else{
        this.formSignUp.markAllAsTouched();
        this.toastr.error('Tous les champs doivent être remplis');
      }
    }
  }

}
