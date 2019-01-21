import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

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
    private alertCtrl: AlertController,
    private projectService: ProjectService
  ) {}

  ionViewDidLoad() {
    this.getProjects().then(() => {}).catch((e) => {
      this.showAlert('An error occured!');
    });
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

  public showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['OK']
    });
    
    alert.present();
  }
}
