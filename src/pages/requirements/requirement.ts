import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Requirement } from '../../models/requirement';
import { Recommendation } from '../../models/recommendation';

import { RecommendationService } from '../../services/recommendation';

@Component({
  templateUrl: 'requirement.html'
})
export class RequirementPage {
  segment: string = "info";
  requirement: Requirement;
  recommendations: Recommendation[] = [];

  constructor(
    private navParams: NavParams,
    private recommendationService: RecommendationService
  ) {
    this.requirement = this.navParams.get('requirement');
  }

  ionViewDidLoad() {
    this.getRecommendations();
  }

  getRecommendations(): Promise<Recommendation[]> {
    return new Promise((resolve, reject) => {
      this.recommendationService.GetByRequirement(this.requirement.requirement_id)
        .subscribe((recommendations) => { 
        this.recommendations = recommendations;

        resolve(recommendations);
      }, e => {
        reject();
      })
    });
  }
}
