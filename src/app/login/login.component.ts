import { Component, OnInit } from '@angular/core';

import { FacebookService } from 'ngx-facebook';

import { UserService } from '../users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  signup = false;
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  password2 = '';
  private FB_APP_ID: number = 1566594110311271;
  private permissions: Array<string> = [
                'public_profile',
            ];
  constructor(private fb: FacebookService,
              private userService: UserService) {
    // Web Facebook sdk
    this.fb.init({
        appId: '1566594110311271',
        version: 'v2.8'
    });
  }

  ngOnInit() {
  }

  toggleType() {
    console.log("Toggling auth type");
    this.signup = !this.signup;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.password2 = '';
  }

  auth() {
    this.loading = true;
    if (this.signup) {
      this.register();
    } else {
      this.login();
    }
  }

  login() {
    console.log("login pressed");
    if (this.email == '' || this.password == '') {
      this.presentError('Please provide a valid email and password.');
      this.loading = false;
    } else {
      this.userService.login(this.email, this.password, (data) => {
        console.log(data);
        if (!data.exception) {
          this.email = '';
          this.password = '';
          this.loading = false;
          // this.navCtrl.setRoot('Dashboard');
        } else {
          this.presentError('No user found with the provided credentials.');
          this.loading = false;
        }
      });
    }
  }

  register() {
    console.log("signup pressed");
    if (this.firstName == '' || this.email == '' || this.password == '' || this.password2 == '') {
      this.presentError('Please provide a first name, email, and matching passwords.');
      this.loading = false;
    } else if (this.password != this.password2) {
      this.presentError('The provided password do not match.')
      this.loading = false;
    } else {
      this.userService.register(this.firstName, this.lastName, this.email, this.password, this.password2, (data) => {
        console.log(data);
        if (!data.exception) {
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.password = '';
          this.password2 = '';
          this.loading = false;
          // this.navCtrl.setRoot('Dashboard');
        } else {
          this.presentError('Registration failed. Please try again.');
          this.loading = false;
        }
      });
    }
  }

  facebookLogin(): Promise<any> {
    let self = this;
    return new Promise((resolve, reject) => {
        console.log("Starting Facebook login...");
        self.fb.login(self.permissions)
        .then(response => {
            console.log("Core Facebook login returned response.");
            this.loading = false;
            resolve(response);
        })
        .catch(error => {
            console.log(error);
            this.loading = false;
            reject(error);
        });
    });
  }

  presentError(message) {
    alert(message);
  }

}
