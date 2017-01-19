import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientHelper } from './http.call.service';
import 'rxjs/Rx';


@Injectable()
export class AddService {

  private httpClient: HttpClientHelper;
  constructor(httpClient: HttpClientHelper,public httpCall:Http) {
    this.httpClient = httpClient;

  }

  addVisitor (data): Observable<any> {
    let url = "api/addVisitor/add";
    let headers = new Headers();
    console.log(url);
    headers.append('Content-Type','application/json');
    headers.append('token',localStorage.getItem('token'));
    return this.httpCall.post(url, data,{headers:headers})
      .map(AddService.addvDone)
      .catch(AddService.handleError);
  }
  private static handleError(error: any) {
    return Observable.throw(error);
  }
  private static addvDone(){
    console.log("user added");

  }
}
