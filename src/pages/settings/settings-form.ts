import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'settings-form.html'
})
export class SettingsFormPage {
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  public save(form: NgForm) {
    // const loading = this.loadingCtrl.create({ 
    //   content: 'Please wait...' 
    // });
    // loading.present();

    // let project = new Project();
    // project.name = form.value.name;
    // project.description = form.value.description;
    // project.size = form.value.size;
    // project.methodology = form.value.methodology;

    // if (this.mode == "New") 
    //   this.projectService.post(project).subscribe((project) => {
    //     loading.dismiss().then(() => {
    //       this.presentToast(project.name + ' saved successfully!');

    //       this.navCtrl.popTo(ProjectsPage)
    //     });
    //   },
    //   err => { loading.dismiss(); });
    // else 
    //   this.projectService.put(project).subscribe((project) => {
    //     loading.dismiss().then(() => {
    //       this.presentToast(project.name + ' saved successfully!');

    //       this.navCtrl.pop()
    //     });
    //   },
    //   err => { loading.dismiss(); });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2400
    });

    toast.present();
  }
}