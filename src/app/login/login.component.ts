import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  // login() {
  //   if(this.username.trim().length === 0){
  //     this.errorMsg = "Username is required";
  //   }else if(this.password.trim().length === 0){
  //     this.errorMsg ="Password is required";
  //   }else{
  //     this.errorMsg = "";
  //     let res = this.auth.login(this.username,  this.password);
  //     if (res === 200) {
  //       this.router.navigate(['home']);
  //     }
  //     if (res === 403) {
  //       this.errorMsg = "Invalid Credentials";
  //     }
  //   }
  // }

  onSubmit() {
    const { username, password } = this.form;

    this.auth.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
