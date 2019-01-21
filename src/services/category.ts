import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Category } from "../models/category";

@Injectable()
export class CategoryService {
  
  constructor(
    private http: Http
  ) {}

  GetAll(): Observable<Category[]> {
    return this.http.get(Config.API_URL + 'categories')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  GetByProject(projectId: string): Observable<Category[]> {
    return this.http.get(Config.API_URL + 'categories/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}