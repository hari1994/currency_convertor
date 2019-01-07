import { HttpClient } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the CurrecyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurrecyProvider {
  headers: any;

  baseURL: any = "https://free.currencyconverterapi.com/api/v6";

  constructor(public http: HttpClient) {
    console.log('Hello CurrecyProvider Provider');
    this.setHeader();

  }
  setHeader() {
    this.headers = new Headers().set("Content-Type", "application/json");
  }



  currencydata() {
    let url = this.baseURL + "/currencies"
    console.log("url" + url)
    return this.http.get(url)
      .map((res: Response) => res)
      .catch(this.handleError)

  }

  convertCurrency(id) {
    let url = this.baseURL + "/convert?q=" + id + "_INR"
    console.log("url" + url)
    return this.http.get(url)
      .map((res: Response) => res)
      .catch(this.handleError)

  }
  private handleError(error: Response) {
    return Observable.throw(error || 'Server Error');
  }
}
