import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Exchangerate} from './models/exhangerate';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class ExchangerateService {

  constructor( private http: Http) { }

  // get rates

  getRates(currCode) {
    return this.http.get('http://localhost:3000/users/' + currCode)
    .map(res => res.json());
  }

}
