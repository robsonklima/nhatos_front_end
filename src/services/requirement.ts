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

  GetByProject(project_id: string): Observable<Requirement[]> {
    return this.http.get(Config.API_URL + 'requirements/' + project_id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}