import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionEditModal } from './question-edit-modal';

@NgModule({
  declarations: [
    QuestionEditModal,
  ],
  imports: [
    IonicPageModule.forChild(QuestionEditModal),
  ],
  exports: [
    QuestionEditModal
  ]
})
export class QuestionEditModalModule {}
