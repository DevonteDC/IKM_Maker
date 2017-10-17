import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeSettings } from './time-settings';

@NgModule({
  declarations: [
    TimeSettings,
  ],
  imports: [
    IonicPageModule.forChild(TimeSettings),
  ],
  exports: [
    TimeSettings
  ]
})
export class TimeSettingsModule {}
