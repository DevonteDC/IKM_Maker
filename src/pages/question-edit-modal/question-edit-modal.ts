import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the TextEditModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-question-edit-modal',
  templateUrl: 'question-edit-modal.html',
})
export class QuestionEditModal {
  question;
  category;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.question = navParams.get("question");
    this.category = navParams.get("category");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionEditModal');
  }

  saveQuestion(){
    this.viewCtrl.dismiss({question:this.modifyStringForDatabase(this.question),category:this.modifyStringForDatabase(this.category)})
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

}
