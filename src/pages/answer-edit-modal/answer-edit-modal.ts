import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AnswerEditModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-answer-edit-modal',
  templateUrl: 'answer-edit-modal.html',
})
export class AnswerEditModal {
  answers;
  correctAnswer;
  incorrectAnswer1;
  incorrectAnswer2;
  incorrectAnswer3;
  questionType;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.answers = navParams.get("answers");
    this.questionType = navParams.get("questionType");

    if(this.questionType == "mc4"){
      this.correctAnswer = this.answers[0];
      this.incorrectAnswer1 = this.answers[1];
      this.incorrectAnswer2 = this.answers[2];
      this.incorrectAnswer3 = this.answers[3];
    }else if(this.questionType == "mc3"){
      this.correctAnswer = this.answers[0];
      this.incorrectAnswer1 = this.answers[1];
      this.incorrectAnswer2 = this.answers[2];
    }else{
      this.correctAnswer = this.answers[0];
      this.incorrectAnswer1 = this.answers[1];
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerEditModal');
  }
  saveAnswer(){
    if(this.questionType == "mc4"){
      console.log(this.correctAnswer == undefined);
      this.answers[0] = this.modifyStringForDatabase(this.correctAnswer);
      this.answers[1] = this.modifyStringForDatabase(this.incorrectAnswer1);
      this.answers[2] = this.modifyStringForDatabase(this.incorrectAnswer2);
      this.answers[3] = this.modifyStringForDatabase(this.incorrectAnswer3);
    }else if(this.questionType == "mc3"){
      this.answers[0] = this.modifyStringForDatabase(this.correctAnswer);
      this.answers[1] = this.modifyStringForDatabase(this.incorrectAnswer1);
      this.answers[2] = this.modifyStringForDatabase(this.incorrectAnswer2);
    }else{
      this.answers[0] = this.modifyStringForDatabase(this.correctAnswer);
      this.answers[1] = this.modifyStringForDatabase(this.incorrectAnswer1);
    }

    this.viewCtrl.dismiss({answers:this.answers,questionType:this.questionType})
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

  change() {
    // get elements
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '0';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if(scroll_height > 96){
      scroll_height = 96;
      textarea.value = textarea.value.slice(0,-1);
    }


    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
}
change2() {
  // get elements
  var element   = document.getElementById('messageInputBox2');
  var textarea  = element.getElementsByTagName('textarea')[0];

  // set default style for textarea
  textarea.style.minHeight  = '0';
  textarea.style.height     = '0';

  // limit size to 96 pixels (6 lines of text)
  var scroll_height = textarea.scrollHeight;
  if(scroll_height > 96){
    scroll_height = 96;
    textarea.value = textarea.value.slice(0,-1);
  }


  // apply new style
  element.style.height      = scroll_height + "px";
  textarea.style.minHeight  = scroll_height + "px";
  textarea.style.height     = scroll_height + "px";
}

change3() {
  // get elements
  var element   = document.getElementById('messageInputBox3');
  var textarea  = element.getElementsByTagName('textarea')[0];

  // set default style for textarea
  textarea.style.minHeight  = '0';
  textarea.style.height     = '0';

  // limit size to 96 pixels (6 lines of text)
  var scroll_height = textarea.scrollHeight;
  if(scroll_height > 96){
    scroll_height = 96;
    textarea.value = textarea.value.slice(0,-1);
  }


  // apply new style
  element.style.height      = scroll_height + "px";
  textarea.style.minHeight  = scroll_height + "px";
  textarea.style.height     = scroll_height + "px";
}

change4() {
  // get elements
  var element   = document.getElementById('messageInputBox4');
  var textarea  = element.getElementsByTagName('textarea')[0];

  // set default style for textarea
  textarea.style.minHeight  = '0';
  textarea.style.height     = '0';

  // limit size to 96 pixels (6 lines of text)
  var scroll_height = textarea.scrollHeight;
  if(scroll_height > 96){
    scroll_height = 96;
    textarea.value = textarea.value.slice(0,-1);
  }


  // apply new style
  element.style.height      = scroll_height + "px";
  textarea.style.minHeight  = scroll_height + "px";
  textarea.style.height     = scroll_height + "px";
}

}
