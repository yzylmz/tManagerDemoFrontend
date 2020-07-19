import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginState: boolean = false;
  username: string;

  title = 'Task Manager';
  isActive: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {

    this.username = localStorage.getItem("username");
    if (this.username != null) {
      this.loginState = true;
    } 
    loginService.getLoggedInName.subscribe(name => this.changeName(name)); 
  }

  ngOnInit(): void {

  }

  changeName(name) {
    this.loginState = true;
    this.username = name;
  }

  clickDropdown() {
    this.isActive = !this.isActive;
  }

  logout() {
    localStorage.clear();
    this.loginState = false;
    this.router.navigate(['login']);
  }
}
