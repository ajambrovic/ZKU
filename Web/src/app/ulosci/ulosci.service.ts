import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UlosciService {

  constructor(public http: Http) { }

  getData(searchItems: Object) {
    const body = new URLSearchParams();
    body.set('cestice', searchItems['cestice']);
    body.set('vlasnik', searchItems['vlasnik']);
    body.set('institucije', searchItems['institucije']);
    body.set('glavnaKnjiga', searchItems['glavnaKnjiga']);
    return this.http.post('http://localhost:3000/ulosci', body)
      .map(res => res.json())
      .catch(this._serverError);
  }

  getInstitutions() {
    return this.http.get('http://localhost:3000/institucije')
      .map(res => res.json())
      .catch(this._serverError);
  }

  getMainBooks(id) {
    const body = new URLSearchParams();
    body.set('institutionID', id);
    return this.http.post('http://localhost:3000/glavneknjige', body)
      .map(res => res.json())
      .catch(this._serverError);
  }

  private _serverError(error: Response) {
    return Observable.throw(error);
  }

}
