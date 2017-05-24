import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
  api: any;

  constructor(private http: Http) {
    this.api = 'https://104.198.251.107/api/jsonws'
  }

  getImage(id, headers, callback) {
    console.log("Fetching image with id:");
    console.log(id);
    if (!id || id == 0) {
     callback(null);
    } else {
      const endpoint = this.api + "/image/get-image/imageId/" + id + "?p_auth=[rt4Vaior]";
      this.http.get(endpoint, {headers: headers})
      .map(res => res.json())
      .subscribe(img => {
        console.log("Found image:");
        console.log(img);
        callback(img);
      })
    }
  }

}
