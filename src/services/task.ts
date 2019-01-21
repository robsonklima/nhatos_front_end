import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Task } from '../models/task';

@Injectable()
export class TaskService {
  
  constructor(
    private http: Http
  ) {}

  getByRequirementId(requirementId: number): Observable<Task[]> {
    return this.http.get(Config.API_URL + 'tasks/' + requirementId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}