import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientHelper } from './http.call.service';
import 'rxjs/Rx';


@Injectable()
export class ViewService {

  private httpClient: HttpClientHelper;
  constructor(httpClient: HttpClientHelper,public httpCall:Http) {
    this.httpClient = httpClient;
  }

  viewVisitor(): Observable<any> {
    console.log("inside service....")
    return this.httpClient.get('api/viewVisitor/view')
      .map(ViewService.extractResponse)
      .catch(ViewService.handleError);
  }
  private static handleError(error: any) {
    return Observable.throw(error);
  }
  public static extractResponse(res: string) {
    let body : any = JSON.parse(res);
    console.log(body);
    return body;
  }
  public static extResponse(res: Response) {
    let body = res;
    console.log(body);
    return body;
  }
}
