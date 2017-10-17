import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import firebase from 'firebase';
import {Time} from '../../providers/time';
import {HomePage} from '../home/home';
/**
 * Generated class for the SubmitModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-submit-modal',
  templateUrl: 'submit-modal.html',
})
export class SubmitModal {
  ikm;
  name;
  category;
  questions;
  purpose;
  user;
  questionCount;
  description;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public zone:NgZone,public loadingCtrl:LoadingController,public time:Time,public viewCtrl:ViewController) {
    this.ikm = navParams.get("ikm");
    this.ikm.creator = navParams.get("user");
    this.name = "";
    this.questionCount = navParams.get("questionCount");
    this.description = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitModal');
  }

  change() {
    // get elements
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '0';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if(scroll_height > 192){
      scroll_height = 192;
      textarea.value = textarea.value.slice(0,-1);
    }


    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
}

  saveForLater(){
    this.ikm.name = this.name;
    this.ikm.questionCount = this.questionCount;
    this.ikm.description = this.description;
    this.ikm.category = this.category;
    this.ikm.purpose = this.purpose;
    this.ikm.postTime = this.time.createDateFromTimestamp(this.time.createTimestamp());
    firebase.database().ref("businesses/" + this.ikm.creator + "/ikms/").push(this.ikm);
    this.viewCtrl.dismiss();
  }

  sendToPublic(){
    this.ikm.name = this.name;
    this.ikm.questionCount = this.questionCount;
    this.ikm.description = this.description;
    this.ikm.purpose = this.purpose;
    this.ikm.category = this.category;
    console.log(this.time.createTimestamp());
    console.log(this.time.createDateFromTimestamp(this.time.createTimestamp()));
    this.ikm.postTime = this.time.createDateFromTimestamp(this.time.createTimestamp());
    firebase.database().ref("businesses/" + this.ikm.creator + "/ikms/").push(this.ikm);
    firebase.database().ref("ikms/").push(this.ikm);
    this.viewCtrl.dismiss();
  }



}
