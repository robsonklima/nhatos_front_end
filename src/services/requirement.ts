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

  getByProjectId(projectId: number): Observable<Requirement[]> {
    return this.http.get(Config.API_URL + 'requirements/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  post(requirement: Requirement): Observable<any> {
    return this.http.post(Config.API_URL + 'requirements', requirement)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  put(requirement: Requirement) {
    return this.http.put(Config.API_URL + 'requirements/' + requirement.requirementId, requirement)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  delete(requirementId: number) {
    return this.http.delete(Config.API_URL + 'requirements/' +requirementId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}