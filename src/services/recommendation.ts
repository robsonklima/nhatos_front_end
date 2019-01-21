import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Recommendation } from '../models/recommendation';

@Injectable()
export class RecommendationService {
  
  constructor(
    private http: Http
  ) {}

  GetByRequirement(requirement_id: number): Observable<Recommendation[]> {
    return this.http.get(Config.API_URL + 'recommendations/' + requirement_id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}