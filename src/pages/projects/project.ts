import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Project } from '../../models/project';
import { Category } from '../../models/category';
import { Requirement } from '../../models/requirement';

import { CategoryService } from '../../services/category';
import { RequirementService } from '../../services/requirement';
import { RequirementPage } from '../requirements/requirement';

@Component({
  templateUrl: 'project.html'
})
export class ProjectPage {
  segment: string = "info";
  project: Project;
  categories: Category[] = [];
  requirements: Requirement[] = [];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private categoryService: CategoryService,
    private requirementService: RequirementService
  ) {
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    this.getProjectCategories().then(() => {
      this.getProjectRequirements();
    });
  }

  getProjectCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.categoryService.GetByProject(this.project.projectId).subscribe((categories) => { 
        this.categories = categories;

        resolve(categories);
      }, e => {
        reject();
      })
    });
  }

  getProjectRequirements(): Promise<Requirement[]> {
    return new Promise((resolve, reject) => {
      this.requirementService.GetByProject(this.project.projectId).subscribe((requirements) => { 
        this.requirements = requirements;

        resolve(requirements);
      }, e => {
        reject();
      })
    });
  }

  onLoadRequirement(requirement: Requirement) {
    this.navCtrl.push(RequirementPage, { requirement: requirement });
  }
}
