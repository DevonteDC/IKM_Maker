import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,AlertController } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the DownloadQuestions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-download-questions',
  templateUrl: 'download-questions.html',
})
export class DownloadQuestions {
  topCategory;
  category;
  subCategories;
  questions;
  serverQs;
  bartenderQs;
  wineQs;
  beerQs;
  subCategory;
  q;
  indexes;
  questionsToAddToQuiz;
  constructor(public navCtrl: NavController, public navParams: NavParams,public zone: NgZone,
    public loadingCtrl:LoadingController,public viewCtrl:ViewController,public alertCtrl:AlertController) {
    this.subCategories = [];
    this.questions = [];
    this.serverQs = [];
    this.bartenderQs = [];
    this.wineQs = [];
    this.beerQs = [];
    this.q = [];
    this.indexes = [];
    this.questionsToAddToQuiz = [];

    let me = this;
    this.zone.run(function(){
      firebase.database().ref("questions/").on("child_added",function(snapshot){
        switch(snapshot.val().category){
          case 'Bartender':
              me.bartenderQs.push(snapshot.val());
              break;
          case 'Server':
              me.serverQs.push(snapshot.val());
              break;
          case 'Wine':
              me.wineQs.push(snapshot.val());
              break;
          case 'Beer':
              me.beerQs.push(snapshot.val());
              break;
        }
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadQuestions');
  }

  addQuestion(index){
    this.q[index] = "checked";
    this.indexes.push(index);
  }

  removeQuestion(index){
    this.q[index] = undefined;
    this.indexes.splice(this.indexes.indexOf(index),1);
  }

  addToQuiz(){
    if(this.indexes.length == 0){
      let alert = this.alertCtrl.create({
       title: 'Confirm exit',
       message: 'No questions will be added. Exit?',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
           }
         },
         {
           text: 'Yes',
           handler: () => {
             this.viewCtrl.dismiss({questionsToAddToQuiz:this.questionsToAddToQuiz,addedQuestions:false})
           }
         }
       ]
     });
     alert.present();

    }else{
      let me = this;
      let loading = this.loadingCtrl.create({
      content: 'adding questions...'
      });

      loading.present();
      this.indexes.forEach(function(i){
        me.questionsToAddToQuiz.push(me.questions[i]);

      })

      setTimeout(() => {
        loading.dismiss();
      }, 1000);


      this.viewCtrl.dismiss({questionsToAddToQuiz:this.questionsToAddToQuiz,addedQuestions:true})
    }

  }

  selectedBartender(){
      this.questions = this.bartenderQs;
  }

  selectedServer(){
    this.questions = this.serverQs;
  }

  selectedWine(){
    this.questions = this.wineQs;

  }

  selectedBeer(){
    this.questions = this.beerQs;

  }



}
