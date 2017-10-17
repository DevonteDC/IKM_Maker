import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TFAnswerEditModal } from './tf-answer-edit-modal';

@NgModule({
  declarations: [
    TFAnswerEditModal,
  ],
  imports: [
    IonicPageModule.forChild(TFAnswerEditModal),
  ],
  exports: [
    TFAnswerEditModal
  ]
})
export class TFAnswerEditModalModule {}
