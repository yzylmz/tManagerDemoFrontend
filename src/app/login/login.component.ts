import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongUsernameorPassword = false;
  submitted = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private Router: Router) {

  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern("^[a-zA-Z]([._-]?[a-zA-Z0-9]+)*$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.valueChanges.subscribe(val => {
      if (this.submitted == true && this.wrongUsernameorPassword == true) {
        this.wrongUsernameorPassword = false;
      }
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {

      if (Object.assign({}, this.loginForm.value).remember == true) {
        var rememberStatus = "true";
      } else {
        rememberStatus = "false";
      }
      this.loginService.loginUser(Object.assign({}, this.loginForm.value).username, Object.assign({}, this.loginForm.value).password).subscribe(
        res => {
          if (res == "wrongUsernameorPassword") {
            this.wrongUsernameorPassword = true;
          } else {
            localStorage.clear();
            localStorage.setItem("authorization", "Bearer " + res.token); 
            localStorage.setItem("username", res.username); 
            localStorage.setItem("userId", res.userId); 
            this.Router.navigate(["/"]);
            this.loginService.getLoggedInName.emit(res.username);
          }
        });
    }
  }

}
