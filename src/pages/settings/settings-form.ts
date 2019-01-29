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
    
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2400
    });

    toast.present();
  }
}