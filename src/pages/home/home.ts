import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Main} from '../main/main';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:string;
  constructor(public navCtrl: NavController) {

  }



  login(){
    this.navCtrl.setRoot(Main,{user:this.user});
  }
}
