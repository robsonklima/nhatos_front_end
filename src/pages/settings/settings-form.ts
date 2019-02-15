import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController, NavController } from 'ionic-angular';

import { Settings } from '../../models/settings';
import { SettingsService } from '../../services/settings';

@Component({
  templateUrl: 'settings-form.html'
})
export class SettingsFormPage {
  settings: Settings = new Settings();

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private settingsService: SettingsService
  ) {}

  ionViewWillEnter() {
    this.getSettings();
  }

  getSettings(): Promise<Settings> {
    return new Promise((resolve, reject) => {
      this.settingsService.getLast().subscribe((settings) => { 
        this.settings = settings;

        console.log(this.settings);
        

        resolve(settings);
      }, e => {
        reject();
      })
    });
  }

  public save(form: NgForm) {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    let settings = new Settings();

    settings.differenceAcceptedBetweenProjectsPercentage = form.value.differenceAcceptedBetweenProjectsPercentage || 0;
    settings.distanceAcceptedBetweenRequirements = form.value.distanceAcceptedBetweenRequirements || 0;
    
    if(form.value.onlyProjectsSameSize)
      settings.onlyProjectsSameSize = 1;
    else
      settings.onlyProjectsSameSize = 0;

    if(form.value.onlyProjectsSameMethodology)
      settings.onlyProjectsSameMethodology = 1;
    else
    settings.onlyProjectsSameMethodology = 0;
    
    this.settingsService.post(settings).subscribe((settings) => {
      loading.dismiss().then(() => {
        this.presentToast('Settings updated successfully!');

        this.navCtrl.pop()
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