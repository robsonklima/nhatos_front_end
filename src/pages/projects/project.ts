import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Project } from '../../models/project';

@Component({
  templateUrl: 'project.html'
})
export class ProjectPage {
  segment: string = "info";
  project: Project;

  constructor(
    private navParams: NavParams
  ) {
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    
  }  
}
