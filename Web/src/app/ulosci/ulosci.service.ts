import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UlosciService {

  constructor(public http: Http) { }

  data() {
    return this.http.get('http://localhost:3000/ulosci')
      .map(res => res.json())
      .catch(this._serverError);
  }

  private _serverError(error: Response) {
    return Observable.throw(error);
  }

}
