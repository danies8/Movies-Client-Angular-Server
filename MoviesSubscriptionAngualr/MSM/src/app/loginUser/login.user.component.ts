import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginUserComponent {
  @ViewChild('userName') userName: ElementRef;
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
    private router: Router) { }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.userName.nativeElement.focus();
    }, 500);
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;

      this.authService.getUserInfo({ userName: userName, password: password }).subscribe({
        next: loginUser => {
          this.authService.currentLoginUser = loginUser;
          let currentLoginUser = this.authService.currentLoginUser;
          if (currentLoginUser.isSuccess) {
            if (currentLoginUser.results.isUserExist) {
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
              } else {
                this.router.navigate(['/users']);
              }
            }
            else {
              this.errorMessage = 'User does not exist, please enter user name and password.';
            }
          }
          else {
            this.errorMessage = currentLoginUser.errorMessage;
          }
        },
        error: err => this.errorMessage = err
      });


    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
