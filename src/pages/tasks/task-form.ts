import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavParams, ToastController, NavController, AlertController } from 'ionic-angular';

import { Task } from '../../models/task';
import { Requirement } from '../../models/requirement';
import { TaskService } from '../../services/task';


@Component({
  templateUrl: 'task-form.html'
})
export class TaskFormPage {
  mode: string;
  task: Task;
  requirement: Requirement;
  
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.requirement = this.navParams.get('requirement');

    if (this.mode == 'Edit')
      this.task = this.navParams.get('task');
  }

  public save(form: NgForm) {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    let task = new Task();

    if (this.mode == 'Edit') {
      task.taskId = this.task.taskId
      task.requirementId = this.task.requirementId
    }
    else
      task.requirementId = this.requirement.requirementId;

    task.name = form.value.name;
    task.percentageCompleted = form.value.percentageCompleted || 0;
    
    if (this.mode == "New") 
      this.taskService.post(task).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.pop().then(() => {
            this.presentToast(task.name + ' saved successfully!');
          });
        });
      },
      err => { loading.dismiss(); });
    else 
      this.taskService.put(task).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.pop().then(() => {
            this.presentToast(task.name + ' saved successfully!');
          });
        });
      },
      err => { loading.dismiss(); });
  }

  onRemoveTask(task: Task) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete the item ' + task.name + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.taskService.delete(task.taskId).subscribe(() => {        
                this.presentToast(task.name + ' deleted successfully!');
      
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

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2400
    });

    toast.present();
  }
}
