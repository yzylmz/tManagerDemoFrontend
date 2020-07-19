import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("authorization");
    // Check whether the token is expired and return
    // true or false
    if (token) {
      const bearer = token.split(" ");
      const bearerToken = bearer[1];
      
      if (bearerToken) { 
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}