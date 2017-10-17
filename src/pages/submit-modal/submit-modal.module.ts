import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitModal } from './submit-modal';

@NgModule({
  declarations: [
    SubmitModal,
  ],
  imports: [
    IonicPageModule.forChild(SubmitModal),
  ],
  exports: [
    SubmitModal
  ]
})
export class SubmitModalModule {}
