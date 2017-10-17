import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the TimeSettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-time-settings',
  templateUrl: 'time-settings.html',
})
export class TimeSettings {
  timerType;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeSettings');
  }

  setTime(){
    this.viewCtrl.dismiss({timerType:this.timerType,timer:this.timer})
  }

}
