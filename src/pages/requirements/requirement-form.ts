import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavParams, ToastController, NavController } from 'ionic-angular';

import { Project } from '../../models/project';
import { Requirement } from '../../models/requirement';
import { ProjectService } from '../../services/project';
import { RequirementService } from '../../services/requirement';

@Component({
  templateUrl: 'requirement-form.html'
})
export class RequirementFormPage {
  mode: string;
  requirement: Requirement;
  projects: Project[] = [];
  
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private projectService: ProjectService,
    private requirementService: RequirementService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.getProjects();

    if (this.mode == 'Edit') {
      this.requirement = this.navParams.get('requirement');
    }
  }

  getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.projectService.getAll().subscribe((projects) => { 
        this.projects = projects;

        resolve(projects);
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

    let requirement = new Requirement();

    if (this.mode == 'Edit')
      requirement.id = this.requirement.id;

    requirement.title = form.value.title;
    requirement.description = form.value.description;
    //requirement.projectId = form.value.projectId;
    
    if (this.mode == 'New')
      this.requirementService.post(requirement).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.pop().then(() => {
            this.presentToast(requirement.title + ' saved successfully!');
          });
        });
      },
      err => {
        loading.dismiss();
      });
    else
      this.requirementService.put(requirement).subscribe(() => {
        loading.dismiss().then(() => {
          this.navCtrl.pop().then(() => {
            this.presentToast(requirement.title + ' saved successfully!');
          });
        });
      },
      err => {
        loading.dismiss();
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
