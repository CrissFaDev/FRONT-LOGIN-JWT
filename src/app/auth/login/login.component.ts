import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/auth/login.service';
import { LoginRequest } from 'src/app/service/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError: string = '';

  loginform: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.username;
  }

  get username() {
    return this.loginform.controls['username'];
  }

  get password() {
    return this.loginform.controls['password'];
  }

  login() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);

      this.loginService.login(this.loginform.value as LoginRequest).subscribe({
        next: (userData) => {
          //console.log(userData);
        },
        error: (e) => {
          console.error(e);
          this.loginError = e;
        },
        complete: () => {
          console.log('login complete');
          //this.router.navigateByUrl('/producto');
          this.loginform.reset();
          this.router.navigateByUrl('/producto');
        },
      });
    }else {
      alert("Error al ingresar los datos.");
    }
  }
}
