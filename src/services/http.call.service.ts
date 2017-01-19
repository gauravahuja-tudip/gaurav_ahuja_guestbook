import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class HttpClientHelper {
  baseUrl: String = 'http://192.168.249.13:4200/';
  constructor(private http: Http) {
    this.http = http;
  }
  preLogin(url, data): Observable<any> {
    let body = JSON.stringify(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    url = this.baseUrl + url;
    return this.http.post(url, body, {headers: headers})
      .map(HttpClientHelper.extractResponse)
      .catch(HttpClientHelper.handleError);
  }

  post(url, data): Observable<any> {
    let body = JSON.stringify(data);
    let headers = new Headers();
    url = this.baseUrl + url;
    return this.http.post(url, body, {headers: headers})
      .map(HttpClientHelper.extractResponse)
      .catch(HttpClientHelper.handleError);
  }

  get(url): Observable<any> {
    console.log("inside http service");
    url = this.baseUrl + url;
    let headers = new Headers();
    headers.append('token',localStorage.getItem('token'));
    return this.http.get(url, {headers: headers});
  }

  private static extractResponse(res: Response) {
    return res.json();
  }

  private static handleError(error: Response){
    return Observable.throw(error);
  }
}
