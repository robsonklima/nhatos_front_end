import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Settings } from '../models/settings';

@Injectable()
export class SettingsService {
  constructor(
    private http: Http
  ) {}
  
  post(settings: Settings): Observable<any> {
    return this.http.post(Config.API_URL + 'settings', settings)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getLast(): Observable<Settings> {
    return this.http.get(Config.API_URL + 'settings')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}