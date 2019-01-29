import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Config } from './../config/config';
import { Observable } from "rxjs/Observable";
import { Project } from "../models/project";

@Injectable()
export class SettingsService {
  
  constructor(
    private http: Http
  ) {}
    
}