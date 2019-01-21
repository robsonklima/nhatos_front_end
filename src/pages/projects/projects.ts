import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Project } from '../../models/project';
import { ProjectPage } from './project';
import { ProjectService } from '../../services/project';

@Component({
  templateUrl: 'projects.html'
})
export class ProjectsPage {
  projects: Project[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private projectService: ProjectService
  ) {}

  ionViewDidLoad() {
    this.getProjects();
  }

  getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      const loading = this.loadingCtrl.create({ 
        content: 'Please wait...' 
      });
      loading.present();

      this.projectService.getAll().subscribe((projects) => { 
        loading.dismiss();
        this.projects = projects;

        resolve(projects);
      }, e => {
        loading.dismiss();
        reject();
      })
    });
  }

  onLoadProject(project: Project) {
    this.navCtrl.push(ProjectPage, { project: project });
  }

  onLoadProjectForm() {
    //to do
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

  doRefresh(refresher) {
    this.getProjects().then(() => {
      refresher.complete();
    }).catch(() => {
      refresher.complete();
    })
  }
}
