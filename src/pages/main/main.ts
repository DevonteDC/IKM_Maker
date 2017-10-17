import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Create} from '../create/create';
/**
 * Generated class for the Main page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class Main {
  user:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
  }

  createIKM(){
    this.navCtrl.setRoot(Create,{user:this.user})
  }

}
