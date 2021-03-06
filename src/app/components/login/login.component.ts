import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {} from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth : AuthService,
    private router : Router
  ) {
    this.auth.getCurrentLoggedIn();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() : void {
    this.loginForm = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    })
  }

  login() : void {
    this.auth.emailLogin(this.loginForm.value.email, this.loginForm.value.password);
  }
}
