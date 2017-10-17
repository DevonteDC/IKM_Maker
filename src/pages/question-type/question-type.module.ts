import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionType } from './question-type';

@NgModule({
  declarations: [
    QuestionType,
  ],
  imports: [
    IonicPageModule.forChild(QuestionType),
  ],
  exports: [
    QuestionType
  ]
})
export class QuestionTypeModule {}
