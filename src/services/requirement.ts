import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Requirement } from '../models/requirement';

@Injectable()
export class RequirementService {
  
  constructor(
    private http: Http
  ) {}

  GetByProjectId(projectId: number): Observable<Requirement[]> {
    return this.http.get(Config.API_URL + 'requirements/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}