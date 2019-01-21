import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

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
    private alertCtrl: AlertController,
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
