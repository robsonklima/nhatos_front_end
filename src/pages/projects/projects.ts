import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Project } from '../../models/project';
import { ProjectPage } from './project';
import { ProjectService } from '../../services/project';

@Component({
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  projects: Project[] = [];

  constructor(
    private navCtrl: NavController,
    private projectService: ProjectService
  ) {}

  ionViewDidLoad() {
    this.getProjects();
  }

  getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.projectService.getAll().subscribe((projects) => { 
        this.projects = projects;

        resolve(projects);
      }, e => {
        reject();
      })
    });
  }

  onLoadProject(project: Project) {
    this.navCtrl.push(ProjectPage, { project: project });
  }

  filterProjects(ev: any) {
    this.getProjects().then(() => {
      const val = ev.target.value;

      if (val && val.trim() != '') {
        this.projects = this.projects.filter((p) => {
          return (p.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    });
  }
}
