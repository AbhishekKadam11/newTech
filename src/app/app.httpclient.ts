import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


@Injectable()
export class HttpClient {

  constructor(private http: Http) {}


  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('auth_token');
    headers.append('Authorization', token);
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
