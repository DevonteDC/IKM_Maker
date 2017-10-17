import { Component,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {HomePage} from '../home/home';
import firebase from 'firebase';
import {SubmitModal} from '../submit-modal/submit-modal';
/**
 * Generated class for the Review page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class Review {
  questions;
  timerType;
  ikm;
  user;
  questionCount;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController,public modalCtrl:ModalController) {
    this.questions= navParams.get("questions");
    this.questionCount = navParams.get("questionCount");
    this.timerType = navParams.get("timerType");
    this.user = navParams.get("user");
    if(this.timerType == "Total"){
      this.questions.forEach(function(q){
        q.timer = navParams.get("timer");
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  Edit(index){
    this.viewCtrl.dismiss({index:index,questions:this.questions,questionCount:this.questionCount});
  }

  goBack(){
    this.viewCtrl.dismiss({index:"create",questions:this.questions,questionCount:this.questionCount})
  }

  Delete(index){
    this.questions.splice(index,1);
    this.questionCount -= 1;
  }

  submitQuestions(){
    this.ikm = {
      questions:this.questions,
      timerType:this.timerType
    }
    let me = this;
    let modal = this.modalCtrl.create(SubmitModal,{ikm:this.ikm,user:this.user,questionCount:this.questionCount});
    modal.onDidDismiss(data=>{
        this.viewCtrl.dismiss({index:null})
    });
    modal.present();



  }

}
