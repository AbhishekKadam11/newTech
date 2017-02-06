import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class RegisterService{
  constructor(private http: Http) {

  }

  register(values) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        'http://localhost:8080/api/signup',
        JSON.stringify({ data:values}),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log(res);
        }

        return res.success;
      });
  }

}
