import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, ToastController } from 'ionic-angular';

import { Requirement } from '../../models/requirement';
import { Task } from '../../models/task';
import { Recommendation } from '../../models/recommendation';

import { RequirementFormPage } from './requirement-form';
import { TaskFormPage } from '../tasks/task-form';
import { TaskService } from '../../services/task';
import { RequirementService } from '../../services/requirement';


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

  ionViewWillEnter() {
    this.refreshRequirement().then(() => {
      this.getTasks();
    })
  }

  onLoadRequirementForm(requirement: Requirement) {
    if (requirement)
      this.navCtrl.push(RequirementFormPage, { requirement: requirement, mode: 'Edit' });
    else
      this.navCtrl.push(RequirementFormPage, { mode: 'New' });
  }

  onLoadTaskFormNew(requirement: Requirement) {
    this.navCtrl.push(TaskFormPage, { requirement: requirement, mode: 'New' });
  }

  onLoadTaskFormEdit(task: Task) {
    this.navCtrl.push(TaskFormPage, { task: task, mode: 'Edit' });
  }

  onRemoveRequirement(requirement: Requirement) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete the item ' + requirement.title + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.requirementService.delete(this.requirement.requirementId).subscribe(() => {        
                this.presentToast('Item deleted successfully!');
      
                this.navCtrl.pop()
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
      this.taskService.getByRequirementId(this.requirement.requirementId).subscribe((tasks) => { 
        this.tasks = tasks;

        resolve(tasks);
      }, e => {
        reject();
      })
    });
  }

  refreshRequirement(): Promise<Requirement> {
    return new Promise((resolve, reject) => {
      this.requirementService.getById(this.requirement.requirementId).subscribe((requirement) => { 
        this.requirement = requirement;
        
        resolve(requirement);
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
