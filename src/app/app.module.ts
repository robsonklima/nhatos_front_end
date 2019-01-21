import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ProjectsPage } from '../pages/projects/projects';
import { ProjectPage } from '../pages/projects/project';
import { RequirementPage } from '../pages/requirements/requirement';
import { CategoriesPage } from '../pages/categories/categories';

import { ProjectService } from '../services/project';
import { CategoryService } from '../services/category';
import { RequirementService } from '../services/requirement';
import { TaskService } from '../services/task';
import { RecommendationService } from '../services/recommendation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectsPage,
    ProjectPage,
    RequirementPage,
    CategoriesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectsPage,
    ProjectPage,
    RequirementPage,
    CategoriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectService,
    CategoryService,
    RequirementService,
    TaskService,
    RecommendationService
  ]
})
export class AppModule {}
