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

  getById(projectId: number): Observable<Project[]> {
    return this.http.get(Config.API_URL + 'projects/' + projectId)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw({error: error}));
  }

  getAll(): Observable<Project[]> {
    return this.http.get(Config.API_URL + 'projects')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  post(project: Project): Observable<any> {
    return this.http.post(Config.API_URL + 'projects', project)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  put(project: Project) {
    return this.http.put(Config.API_URL + 'projects/' + project.projectId, project)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  delete(projectId: number) {
    return this.http.delete(Config.API_URL + 'projects/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}