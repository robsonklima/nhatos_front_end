import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, ToastController } from 'ionic-angular';

import { Requirement } from '../../models/requirement';
import { Task } from '../../models/task';
import { Recommendation } from '../../models/recommendation';

import { TaskService } from '../../services/task';
import { RequirementService } from '../../services/requirement';
import { RequirementFormPage } from './requirement-form';


@Component({
  templateUrl: 'requirement.html'
})
export class RequirementPage {
  segment: string = "Info";
  requirement: Requirement;
  tasks: Task[] = [];
  recommendations: Recommendation[] = [];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private requirementService: RequirementService,
    private taskService: TaskService
  ) {
    this.requirement = this.navParams.get('requirement');
  }

  ionViewDidLoad() {
    this.getTasks();
  }

  onLoadRequirementForm(requirement: Requirement) {
    if (requirement)
      this.navCtrl.push(RequirementFormPage, { requirement: requirement, mode: 'Edit' });
    else
      this.navCtrl.push(RequirementFormPage, { mode: 'New' });
  }

  onRemoveRequirement(requirement: Requirement) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete this requirement?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.requirementService.delete(this.requirement.requirementId).subscribe((requirement) => {        
                this.presentToast('Item deleted successfully!');
      
                this.navCtrl.popToRoot()
            },
            err => {
              this.presentToast('Something went wrong!');
            });
          }
        }
      ]
    });

    confirm.present();
  }
  

  getTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.taskService.getByRequirementId(this.requirement.requirementId)
        .subscribe((tasks) => { 
        this.tasks = tasks;

        resolve(tasks);
      }, e => {
        reject();
      })
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
