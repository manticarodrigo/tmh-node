import { Component } from '@angular/core';

import { UserService } from './users/user.service';
import { ImageService } from './images/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Router';
  constructor(private userService: UserService,
              private imageService: ImageService) {
    this.userService.login('manticarodrigo@gmail.com', 'xlemrotm34711', function(user) {
      console.log("logged in with user:");
      console.log(user);
    });
  }
  // fetchCurrentUser() {
  //   // console.log('erasing storage for login debugging');
  //   // this.storage.clear().then(() => { // clear cache for login debugging
  //     let self = this;
  //     Promise.all([this.storage.get('user'), this.storage.get('token')])
  //     .then(data => {
  //       const user = data[0];
  //       const token = data[1];
  //       if (!user || !token) {
  //         console.log('No stored user found');
  //         console.log(user);
  //         console.log(token);
  //       } else {
  //         console.log('Stored user found');
  //         self.userService.setCurrentUser(user, token)
  //         .then(user => {
  //           self.nav.setRoot('Dashboard');
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //       }
  //     });

  //     // }); // clear cache for login debug
  //   }

    profilePressed() {
      console.log("view profile pressed");
    }

    allPressed() {
      console.log("all projects pressed");
    }

    newPressed() {
      console.log("new project pressed");
    }

    logout() {
      console.log("logout pressed");
    }
}
