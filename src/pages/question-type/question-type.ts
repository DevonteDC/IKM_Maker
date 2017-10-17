import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the QuestionType page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-type',
  templateUrl: 'question-type.html',
})
export class QuestionType {
  questionType;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.questionType = navParams.get("questionType");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionType');
  }

  setQType(){
    this.viewCtrl.dismiss({questionType:this.questionType});
  }

}
