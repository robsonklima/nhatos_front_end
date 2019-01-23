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

  GetByRequirementId(requirementId: number): Observable<Recommendation[]> {
    return this.http.get(Config.API_URL + 'recommendations/requirements/' + requirementId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  GetByProjectId(projectId: number): Observable<Recommendation[]> {
    return this.http.get(Config.API_URL + 'recommendations/projects/' + projectId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  Post(recommendation: Recommendation): Observable<any> {
    return this.http.post(Config.API_URL + 'recommendations/projects', recommendation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}