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
  segment: string = "Info";
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
}
