import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SymfonyEmailValidator} from "../validators/symfony-email.validator";
import {AuthService} from "../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppService} from "../app.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public formSignIn: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, public toastr: ToastrService, public router: Router, public appService: AppService) {
    this.formSignIn = this.fb.group({
      email: ['', [Validators.required, SymfonyEmailValidator]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.formSignIn.controls;
  }

  public submit(){
    if (this.formSignIn.valid) {
      this.authService.SignIn(this.f.email.value, this.f.password.value);
    } else {
      this.formSignIn.markAllAsTouched();
      this.toastr.error('Tous les champs doivent être remplis');
    }
  }

}
