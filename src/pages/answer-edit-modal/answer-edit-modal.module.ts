import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerEditModal } from './answer-edit-modal';

@NgModule({
  declarations: [
    AnswerEditModal,
  ],
  imports: [
    IonicPageModule.forChild(AnswerEditModal),
  ],
  exports: [
    AnswerEditModal
  ]
})
export class AnswerEditModalModule {}
