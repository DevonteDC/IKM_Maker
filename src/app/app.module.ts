import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Main} from '../pages/main/main';
import {Create} from '../pages/create/create';

import {QuestionEditModal} from '../pages/question-edit-modal/question-edit-modal';
import {AnswerEditModal} from '../pages/answer-edit-modal/answer-edit-modal';
import {Review} from '../pages/review/review';
import {UserData} from '../providers/user-data';
import {TimeSettings} from '../pages/time-settings/time-settings';
import {QuestionType} from '../pages/question-type/question-type';
import {TFAnswerEditModal} from '../pages/tf-answer-edit-modal/tf-answer-edit-modal';
import {DownloadQuestions} from '../pages/download-questions/download-questions';
import {SubmitModal} from '../pages/submit-modal/submit-modal';
import {Time} from '../providers/time';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Main,
    Create,
    QuestionEditModal,
    AnswerEditModal,
    Review,
    TimeSettings,
    QuestionType,
    TFAnswerEditModal,
    DownloadQuestions,
    SubmitModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Main,
    Create,
    QuestionEditModal,
    AnswerEditModal,
    Review,
    TimeSettings,
    QuestionType,
    TFAnswerEditModal,
    DownloadQuestions,
    SubmitModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserData,
    Time
  ]
})
export class AppModule {}
