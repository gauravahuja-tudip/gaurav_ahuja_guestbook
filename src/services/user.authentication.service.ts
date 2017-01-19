import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientHelper } from './http.call.service';
import 'rxjs/Rx';


@Injectable()
export class UserService {
  private loginUrl: string = 'api/auth/login';
  private registerUrl: string = 'api/auth/register';
  //private viewVisitorUrl:string = 'api/visitors/findAll';

  private httpClient: HttpClientHelper;
  constructor(httpClient: HttpClientHelper,public httpCall:Http) {
    this.httpClient = httpClient;

  }

  // For login and register service

  userLogin(data): Observable<any> {
    return this.httpClient.preLogin(this.loginUrl, data)
      .map(UserService.extractResponse)
      .catch(UserService.handleError);
  }

  userRegister(data): Observable<any> {
    console.log(this.registerUrl);
    return this.httpClient.preLogin(this.registerUrl, data)
      .map(UserService.extractResponse)
      .catch(UserService.handleError);
  }

  public static extractResponse(res: Response) {
    let body = res;
    console.log(body);
    return body;
  }
  private static handleError(error: any) {
    return Observable.throw(error);
  }
}
