import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Create } from './create';

@NgModule({
  declarations: [
    Create,
  ],
  imports: [
    IonicPageModule.forChild(Create),
  ],
  exports: [
    Create
  ]
})
export class CreateModule {}
