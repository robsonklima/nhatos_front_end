import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

import { Requirement } from '../../models/requirement';
import { Task } from '../../models/task';
import { Recommendation } from '../../models/recommendation';

import { TaskService } from '../../services/task';
import { RecommendationService } from '../../services/recommendation';


@Component({
  templateUrl: 'requirement.html'
})
export class RequirementPage {
  segment: string = "info";
  requirement: Requirement;
  tasks: Task[] = [];
  recommendations: Recommendation[] = [];

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private taskService: TaskService,
    private recommendationService: RecommendationService
  ) {
    this.requirement = this.navParams.get('requirement');
  }

  ionViewDidLoad() {
    this.getTasks();
    this.getRecommendations();
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

  getRecommendations(): Promise<Recommendation[]> {
    return new Promise((resolve, reject) => {
      this.recommendationService.GetByRequirement(this.requirement.requirementId)
        .subscribe((recommendations) => { 
        this.recommendations = recommendations;

        resolve(recommendations);
      }, e => {
        reject();
      })
    });
  }

  public acceptRecommendation() {
    const confirmacao = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to accept this recommendation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Accept',
          handler: () => {
            
          }
        }
      ]
    });

    confirmacao.present();
  }

  public rejectRecommendation() {
    const confirmacao = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to reject this recommendation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Reject',
          handler: () => {
            
          }
        }
      ]
    });

    confirmacao.present();
  }

  public moreInformations() {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    
    alert.present();
  }
}
