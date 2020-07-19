import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(public AuthService: AuthService, public Router: Router) {}

  canActivate(): boolean {
    if (this.AuthService.isAuthenticated()) {
      return true;
    } else {
      this.Router.navigate(["login"]);
      return false;
    }
  }
}