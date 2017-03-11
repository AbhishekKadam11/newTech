/**
 * Created by Admin on 20-11-2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './../../app.httpclient';

@Injectable()

export class ProductService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getBasicDetails() {
    return this.http.get('http://localhost:8080/api/userBasicDetails')
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

  getstates() {
    return this.http.get('http://localhost:8080/api/state')
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

  getcities(stateid) {
    var selectedstate = JSON.stringify({ data: stateid });
    return this.http.get('http://localhost:8080/api/cities/'+stateid)
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
