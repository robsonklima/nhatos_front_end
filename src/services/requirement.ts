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

  getById(id: number): Observable<Requirement> {
    return this.http.get(Config.API_URL + 'requirements/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getByProjectCode(code: string): Observable<Requirement[]> {
    return this.http.get(Config.API_URL + 'projects/requirements/' + code)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  post(requirement: Requirement): Observable<any> {
    return this.http.post(Config.API_URL + 'requirements', requirement)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  put(requirement: Requirement) {
    return this.http.put(Config.API_URL + 'requirements/' + requirement.id, requirement)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  delete(id: number) {
    return this.http.delete(Config.API_URL + 'requirements/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}