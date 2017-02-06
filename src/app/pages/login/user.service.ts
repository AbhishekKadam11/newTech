import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { HttpClient  } from './../../app.httpclient';
// import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {

  public loggedIn = false;
  public profileName:string;
  public userId:string;
  public basicdata:string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    // this.userId = route.snapshot.params[localStorage.getItem('auth_token')];
  }

  login(values) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        'http://localhost:8080/api/authenticate',
        JSON.stringify({ name:values.email, password:values.password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
       //   this.authtoken.createAuthorizationHeader(res.token);
          var headers = new Headers({ 'Authorization': res.token });
          var loggedIn = true;
          this.setProfileData(res);
        }
        return res;
      })
  }

  setProfileData(data){
    this.profileName = data.profilename;
   // this.userId = data.token;
    this.basicdata = data;
    this.getProfileData();
  }

  public getProfileData() {
    return this.basicdata;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
