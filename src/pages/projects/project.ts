import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, ToastController } from 'ionic-angular';

import { Project } from '../../models/project';
import { Category } from '../../models/category';
import { Requirement } from '../../models/requirement';
import { Recommendation } from '../../models/recommendation';

import { RequirementPage } from '../requirements/requirement';
import { ProjectFormPage } from './project-form';
import { RequirementFormPage } from '../requirements/requirement-form';

import { ProjectService } from '../../services/project';
import { CategoryService } from '../../services/category';
import { RequirementService } from '../../services/requirement';
import { RecommendationService } from '../../services/recommendation';


@Component({
  templateUrl: 'project.html'
})
export class ProjectPage {
  segment: string = "Info";
  project: Project;
  categories: Category[] = [];
  requirements: Requirement[] = [];
  recommendations: Recommendation[] = [];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private requirementService: RequirementService,
    private recommendationService: RecommendationService
  ) {
    this.project = this.navParams.get('project');
  }

  ionViewWillEnter() {
    this.refreshProject().then(() => {
      this.getCategories().then(() => {
        this.getRequirements().then(() => {
          this.getRecommendations().then(() => {

          }).catch(() => {
  
          });
        }).catch(() => {

        });
      }).catch(() => {

      });
    }).catch(() => {

    });
  }

  onLoadProjectForm(project: Project) {
    this.navCtrl.push(ProjectFormPage, { project: project,  mode: 'Edit' });
  }

  getCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.categoryService.GetByProjectId(this.project.projectId).subscribe((categories) => { 
        this.categories = categories;
        
        resolve(categories);
      }, e => {
        reject();
      })
    });
  }

  getRequirements(): Promise<Requirement[]> {
    return new Promise((resolve, reject) => {
      this.requirementService.getByProjectId(this.project.projectId).subscribe((requirements) => { 
        this.requirements = requirements;

        resolve(requirements);
      }, e => {
        reject(e);
      })
    });
  }

  getRecommendations(): Promise<Recommendation[]> {
    return new Promise((resolve, reject) => {
      this.recommendationService.GetByProjectId(this.project.projectId).subscribe((recommendations) => { 
        this.recommendations = recommendations;

        resolve(recommendations);
      }, e => {
        reject();
      })
    });
  }

  onLoadRequirement(requirement: Requirement) {
    this.navCtrl.push(RequirementPage, { requirement: requirement });
  }

  public onAcceptRecommendation(recommendation: Recommendation) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to admit this recommendation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Edit',
          handler: () => {}
        },
        {
          text: 'Accept',
          handler: () => {
            recommendation.accepted = 1;

            this.recommendationService.Post(recommendation).subscribe((rec) => {
              this.getRecommendations();
            }, e => {});
          }
        }
      ]
    });

    confirm.present();
  }

  public onRejectRecommendation(recommendation: Recommendation) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to refuse this recommendation?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Reject',
          handler: () => {
            recommendation.accepted = 0;

            this.recommendationService.Post(recommendation).subscribe((r) => {
              this.getRecommendations();
            }, e => {});
          }
        }
      ]
    });

    confirm.present();
  }

  onRemoveProject(project: Project) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to delete the item ' + project.name + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.projectService.delete(project.projectId).subscribe(() => {        
              this.navCtrl.pop().then(() => {
                this.presentToast(project.name + ' deleted successfully!');
              });
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

  onLoadRequirementForm() {
    this.navCtrl.push(RequirementFormPage, { mode: 'New' });
  }

  refreshProject(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.projectService.getById(this.project.projectId).subscribe((projects) => { 
        this.project = projects[0];
        
        resolve(projects);
      }, err => {
        console.log(err)

        reject(err);
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
