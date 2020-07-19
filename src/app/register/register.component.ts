import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  usernameExist = false;
  isModalActive: boolean = false;
  IncludeCheckbox: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private Router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern("^[a-zA-Z]([._-]?[a-zA-Z0-9]+)*$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      include: ['']
    }, { validator: ConfirmPasswordValidator.MatchPassword });

    this.registerForm.valueChanges.subscribe(val => {
      if (this.submitted == true && this.usernameExist == true) {
        this.usernameExist = false;
      }
    });
  }
  get f() { return this.registerForm.controls; }

  toggleModal() {
    if (this.isModalActive == false) {
      this.isModalActive = true;
    } else {
      this.isModalActive = false;
      this.Router.navigate(["/login"]);
    } 
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      if (Object.assign({}, this.registerForm.value).include && Object.assign({}, this.registerForm.value).include == true) {
        var includeStatus = "true";
      } else {
        includeStatus = "false";
      }

      this.registerService.createUser(Object.assign({}, this.registerForm.value).username, Object.assign({}, this.registerForm.value).password).subscribe(
        res => { 
          if (res == "successful") {
            localStorage.clear();
            this.isModalActive = true;
          } else {
            if ("usernamexist") {
              this.usernameExist = true;
            }
          }
        });
    }
  }
}
