import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavParams, ToastController, NavController } from 'ionic-angular';

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
      project.projectId = this.project.projectId

    project.name = form.value.name;
    project.description = form.value.description;
    project.size = form.value.size;
    project.methodology = form.value.methodology;

    if (this.mode == "New") 
      this.projectService.post(project).subscribe((project) => {
        loading.dismiss().then(() => {
          this.presentToast(project.name + ' saved successfully!');

          this.navCtrl.popToRoot()
        });
      },
      err => { loading.dismiss(); });
    else 
      this.projectService.put(project).subscribe((project) => {
        loading.dismiss().then(() => {
          this.presentToast(project.name + ' saved successfully!');

          this.navCtrl.popToRoot()
        });
      },
      err => { loading.dismiss(); });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2400
    });

    toast.present();
  }
}
