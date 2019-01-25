import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjectsPage } from '../projects/projects';
import { CategoriesPage } from '../categories/categories';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    private navCtrl: NavController
  ) {}

  onLoadProjects() {
    this.navCtrl.push(ProjectsPage);
  }

  onLoadCategories() {
    this.navCtrl.push(CategoriesPage);
  }

  onLoadSettings() {
    this.navCtrl.push(SettingsPage);
  }
}