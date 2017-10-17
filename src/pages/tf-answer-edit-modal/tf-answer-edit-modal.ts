import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the TFAnswerEditModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tf-answer-edit-modal',
  templateUrl: 'tf-answer-edit-modal.html',
})
export class TFAnswerEditModal {
  correctAnswer;
  answers;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.answers = navParams.get("answers");
    this.correctAnswer = this.answers[0];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TFAnswerEditModal');
  }

  saveAnswer(){
    this.answers[0] = this.modifyStringForDatabase(this.correctAnswer);
    this.answers[1] = this.modifyStringForDatabase(this.correctAnswer == "True"? "False":"True");
    this.viewCtrl.dismiss({answers:this.answers})
  }

  modifyStringForDatabase(string)
  {
    let modifiedString = [];
    let words = string.split(" ");
    words.forEach(function(w){
      modifiedString.push(w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    });
    return modifiedString.join(" ").trim();
  }

}
