import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Project } from '../../models/project';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/category';

@Component({
  templateUrl: 'project.html'
})
export class ProjectPage {
  segment: string = "info";
  project: Project;
  categories: Category[] = [];

  constructor(
    private navParams: NavParams,
    private categoryService: CategoryService
  ) {
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    this.getProjectCategories();
  }

  getProjectCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.categoryService.GetByProject(this.project.project_id).subscribe((categories) => { 
        this.categories = categories;

        resolve(categories);
      }, e => {
        reject();
      })
    });
  }
}
