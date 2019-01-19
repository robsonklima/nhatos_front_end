import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Project } from "../models/project";

@Injectable()
export class ProjectService {
  
  constructor(
    private http: Http
  ) {}

  getAll(): Observable<Project[]> {
    return this.http.get(Config.API_URL + 'projects')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  categoriesGetAll(): Observable<Project[]> {
    return this.http.get(Config.API_URL + 'projects/categories')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}