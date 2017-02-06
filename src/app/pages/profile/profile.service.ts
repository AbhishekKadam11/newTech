/**
 * Created by Admin on 20-11-2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './../../app.httpclient';

@Injectable()

export class ProfileService {
  constructor(private http: HttpClient) {
    this.http = http;
  }
  getcities() {
    return this.http.get('http://localhost:8080/api/state')
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

  setprofileData(profile) {
    var profiledata = JSON.stringify({ data: profile });
    return this.http.post('http://localhost:8080/api/profiledata', profile)
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

}
