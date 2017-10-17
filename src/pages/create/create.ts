import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import {QuestionEditModal} from '../question-edit-modal/question-edit-modal';
import {AnswerEditModal} from '../answer-edit-modal/answer-edit-modal';
import {Review} from '../review/review';
import {TimeSettings} from '../time-settings/time-settings';
import {QuestionType} from '../question-type/question-type';
import {TFAnswerEditModal} from '../tf-answer-edit-modal/tf-answer-edit-modal';
import {DownloadQuestions} from '../download-questions/download-questions';
import {HomePage} from '../home/home';
import {Main} from '../main/main';
//import {Review} from '../review/review';
//import {UserData} from '../../providers/user-data';

/**
* Generated class for the Create page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class Create {
  user;
  question;
  questions;
  answers;
  category;
  clearTemplate;
  questionType;
  index;
  questionCount = 0;
  timer = 10;
  timerType ="Individual";
  allTimers;
  savedTimers;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public alertCtrl:AlertController) {
    this.user = this.navParams.get("user");
    this.answers = ['','','',''];
    this.question = "";
    this.questions = [];
    this.questionType = "mc4";

  }

  openTimeSettings(){
    let modal = this.modalCtrl.create(TimeSettings,{});
    modal.onDidDismiss(data=>{
        this.timer = Number(data.timer);
        this.timerType = data.timerType;


    });
    modal.present();
  }

  goBackToMain(){
    let alert = this.alertCtrl.create({
     title: 'Confirm exit',
     message: 'You will lose all of your progress! Exit?',
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
             this.navCtrl.setRoot(Main,{user:this.user});
         }
       }
     ]
   });
   alert.present();


  }

  openDownloadQuestions(){
    let modal = this.modalCtrl.create(DownloadQuestions,{});
    modal.onDidDismiss(data=>{
        //splice questions into current questions;
        if(data.addedQuestions == true){
          let me = this;
          data.questionsToAddToQuiz.forEach(function(q){
            me.questions.push(q);
            me.questionCount += 1;

          })
          this.createAlert("Questions were added to your quiz!");
        }


    });
    modal.present();
  }



  openQuestionType(){
    let modal = this.modalCtrl.create(QuestionType,{questionType:this.questionType});
    modal.onDidDismiss(data=>{
        this.questionTypeChanged(data.questionType);
    });
    modal.present();
  }

  questionTypeChanged(type){

    if(this.questionType == "mc4" && type == "mc3"){
      this.answers = [this.answers[0],this.answers[1],this.answers[2]];
    }
    else if((this.questionType == "mc4" || this.questionType == "mc3") && type == "mc2"){
      this.answers = [this.answers[0],this.answers[1]];
    }
    else if (this.questionType == "mc2" && type == "mc3"){
      this.answers = [this.answers[0],this.answers[1],""];
    }else if(this.questionType == "mc2" && type == "mc4"){
      this.answers = [this.answers[0],this.answers[1],"",""];
    }else if(this.questionType == "mc3" && type == "mc4"){
      this.answers = [this.answers[0],this.answers[1],this.answers[2],""];
  }

  this.questionType = type;
}
  openQuestionEditor(){
    let modal = this.modalCtrl.create(QuestionEditModal,{question:this.question,category:this.category});
    modal.onDidDismiss(data=>{
      this.question = data.question;
      this.category = data.category;
    });
    modal.present();
  }

  openAnswerEditor(){
    let modal = this.modalCtrl.create(AnswerEditModal,{answers:this.answers,questionType:this.questionType});
    modal.onDidDismiss(data=>{
      this.answers = data.answers;
      this.questionType = data.questionType;
    });
    modal.present();
  }

  openTFAnswerEditor(){
    let modal = this.modalCtrl.create(TFAnswerEditModal,{answers:this.answers});
    modal.onDidDismiss(data=>{
      this.answers = data.answers;
    });
    modal.present();
  }

  createAlert(message){
    let alert = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  reviewAndSubmit(){
    if(this.questions.length != 0){

      let modal = this.modalCtrl.create(Review,{questions:this.questions,timerType:this.timerType,
        timer:this.timer,user:this.user,questionCount:this.questionCount});

      modal.onDidDismiss(data=>{
        this.questions = data.questions;
        this.questionCount = data.questionCount;

        if(data.index == "create"){
          // do nothing
        }

        else if(data.index != null){

          let q = this.questions[data.index];
          this.question = q.question;
          this.questionType = q.questionType;
          if(this.questionType == "mc4"){
            this.answers = [q.correctAnswer,q.incorrectAnswer1,q.incorrectAnswer2,q.incorrectAnswer3];
          }else if(this.questionType == "mc3"){
            this.answers = [q.correctAnswer,q.incorrectAnswer1,q.incorrectAnswer2];
          }else if (this.questionType == "mc2" || this.questionType == "t/f"){
            this.answers = [q.correctAnswer,q.incorrectAnswer1];
          }

          this.category = q.category;
          this.index = data.index;

          this.timer = Number(q.timer);


        }else{
          this.navCtrl.setRoot(Main,{user:this.user});
        }

      });
      modal.present();
    }else{
      this.createAlert("There are 0 Questions in your quiz");
    }
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

  newQuestion(){
    if(this.questionType == "mc4"){
      this.checkmc4();
    }else if(this.questionType == "mc3"){
      this.checkmc3();
    }else if(this.questionType == "mc2"){
      this.checkmc2();
    }else if(this.questionType == "t/f"){
      this.checktf();
    }


  }

  checkmc4(){
    if(this.question != ''){
      if(this.answers[0] != ''){
        if(this.answers[1] != ''){
          if(this.answers[2] != ''){
            if(this.answers[3] != ''){
              if(this.index != null){
                this.questions.splice(this.index,1,{
                  question:this.question,
                  questionType:this.questionType,
                  category: this.category,
                  correctAnswer:this.answers[0],
                  incorrectAnswer1:this.answers[1],
                  incorrectAnswer2:this.answers[2],
                  incorrectAnswer3:this.answers[3],
                  creator:this.user,
                  timer:this.timer
                });
                this.index = null;

                this.question = "";
                this.answers = ['','','',''];
                this.category = '',
                this.createAlert("Question was revised!");
              }else{
                this.questions.push({
                  question:this.question,
                  questionType:this.questionType,
                  category: this.category,
                  correctAnswer:this.answers[0],
                  incorrectAnswer1:this.answers[1],
                  incorrectAnswer2:this.answers[2],
                  incorrectAnswer3:this.answers[3],
                  creator:this.user,
                  timer:this.timer
                });
                this.question = "";
                this.answers = ['','','',''];
                this.category = '',
                this.questionCount += 1;
                this.createAlert("Question was added to your quiz!");
              }




            }else{
              this.createAlert("Incorrect Answer 3 was not entered");

            }
          }else{
            this.createAlert("Incorrect Answer 2 was not entered");
          }
        }else{
          this.createAlert("Incorrect Answer 1 was not entered");
        }
      }else{
        this.createAlert("Correct Answer was not entered");
      }

    }else{
      this.createAlert("No question was entered");
    }
  }


  checkmc3(){
    if(this.question != ''){
      if(this.answers[0] != ''){
        if(this.answers[1] != ''){
          if(this.answers[2] != ''){
            if(this.index != null){
              this.questions.splice(this.index,1,{
                question:this.question,
                questionType:this.questionType,
                category: this.category,
                correctAnswer:this.answers[0],
                incorrectAnswer1:this.answers[1],
                incorrectAnswer2:this.answers[2],
                creator:this.user,
                timer:this.timer
              });
              this.index = null;
              this.question = "";
              this.answers = ['','','',''];
              this.category = '',
              this.createAlert("Question was revised!");
            }else{
              this.questions.push({
                question:this.question,
                questionType:this.questionType,
                category: this.category,
                correctAnswer:this.answers[0],
                incorrectAnswer1:this.answers[1],
                incorrectAnswer2:this.answers[2],
                creator:this.user,
                timer:this.timer
              });
              this.question = "";
              this.answers = ['','','',''];
              this.category = '',
              this.createAlert("Question was added to your quiz!");
              this.questionCount += 1;
            }
          }else{
            this.createAlert("Incorrect Answer 2 was not entered");

          }
        }else{
          this.createAlert("Incorrect Answer 1 was not entered");

        }
      }else{
        this.createAlert("Correct answer was not entered");
      }

    }else{
      this.createAlert("No question was entered");
    }
  }


  checkmc2(){
    if(this.question != ''){
      if(this.answers[0] != ''){
        if(this.answers[1] != ''){
          if(this.index != null){
            this.questions.splice(this.index,1,{
              question:this.question,
              questionType:this.questionType,
              category: this.category,
              correctAnswer:this.answers[0],
              incorrectAnswer1:this.answers[1],
              creator:this.user,
              timer:this.timer
            });
            this.index = null;
            this.question = "";
            this.answers = ['','','',''];
            this.category = '',
            this.createAlert("Question was revised!");
          }else{
            this.questions.push({
              question:this.question,
              questionType:this.questionType,
              category: this.category,
              correctAnswer:this.answers[0],
              incorrectAnswer1:this.answers[1],
              creator:this.user,
              timer:this.timer
            });
            this.question = "";
            this.answers = ['','','',''];
            this.category = '',
            this.createAlert("Question was added to your quiz!");
            this.questionCount += 1;
          }
        }else{
          this.createAlert("Incorrect Answer 1 was not entered");

        }
      }else{
        this.createAlert("Correct Answer was not entered");

      }

    }else{
      this.createAlert("No question was entered");

    }
  }

  checktf(){
    if(this.question != ''){
      if(this.answers[0] != ''){
        if(this.index != null){
          this.questions.splice(this.index,1,{
            question:this.question,
            questionType:this.questionType,
            category: this.category,
            correctAnswer:this.answers[0],
            incorrectAnswer1:this.answers[0] == 'True' ? 'False':'True',
            creator:this.user,
            timer:this.timer
          });

          this.index = null;
          this.question = "";
          this.answers = ['','','',''];
          this.category = '',
          this.createAlert("Question was revised!");
        }else{
          this.questions.push({
            question:this.question,
            questionType:this.questionType,
            category: this.category,
            correctAnswer:this.answers[0],
            incorrectAnswer1:this.answers[0] == 'True' ? 'False':'True',
            creator:this.user,
            timer:this.timer
          });
          this.question = "";
          this.answers = ['','','',''];
          this.category = '',
          this.createAlert("Question was added to your quiz!");
          this.questionCount += 1;
        }

      }else{
        this.createAlert("Correct Answer was not entered");

      }

    }else{
      this.createAlert("No question was entered");

    }
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad Create');
  }

}
