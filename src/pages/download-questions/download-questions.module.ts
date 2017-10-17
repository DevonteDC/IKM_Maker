import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadQuestions } from './download-questions';

@NgModule({
  declarations: [
    DownloadQuestions,
  ],
  imports: [
    IonicPageModule.forChild(DownloadQuestions),
  ],
  exports: [
    DownloadQuestions
  ]
})
export class DownloadQuestionsModule {}
