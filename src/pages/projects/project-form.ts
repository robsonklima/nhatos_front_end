import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavParams, ToastController, NavController } from 'ionic-angular';

import { ProjectsPage } from './projects';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project';


@Component({
  templateUrl: 'project-form.html'
})
export class ProjectFormPage {
  mode: string;
  project: Project;
  
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'Edit') 
      this.project = this.navParams.get('project');
  }

  public save(form: NgForm) {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    let project = new Project();

    if (this.mode == 'Edit')
      project.id = this.project.id

    project.title = form.value.title;
    project.description = form.value.description;
    project.size = form.value.size;
    project.methodology = form.value.methodology;

    if (this.mode == "New") 
      this.projectService.post(project).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.popTo(ProjectsPage).then(() => {
            this.presentToast(project.title + ' saved successfully!');
          });
        });
      },
      err => { loading.dismiss(); });
    else 
      this.projectService.put(project).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.pop().then(() => {
            this.presentToast(project.title + ' saved successfully!');
          });
        });
      },
      err => { loading.dismiss(); console.log(err);
       });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2400
    });

    toast.present();
  }
}
