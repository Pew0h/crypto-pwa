import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class isConnectedGuard implements CanActivate {

  constructor(public authService: AuthService, public toastr: ToastrService) {
  }

  canActivate() {
    if (this.authService.isLoggedIn){
      return true;
    }else{
      this.toastr.error('Veuillez vous connecter')
      return false;
    }
  }

}
