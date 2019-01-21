import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category';

@Component({
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  categories: Category[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService
  ) {}

  ionViewDidLoad() {
    this.getCategories().then(() => {}).catch((e) => {});
  }

  getCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      const loading = this.loadingCtrl.create({ 
        content: 'Please wait...' 
      });
      loading.present();

      this.categoryService.GetAll().subscribe((categories) => { 
        loading.dismiss();
        this.categories = categories;

        resolve(categories);
      }, e => {
        loading.dismiss();
        reject();
      })
    });
  }

  filterCategories(ev: any) {
    this.getCategories().then(() => {
      const val = ev.target.value;

      if (val && val.trim() != '') {
        this.categories = this.categories.filter((c) => {
          return (c.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    });
  }
}
