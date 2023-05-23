import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectdevicesPageRoutingModule } from './selectdevices-routing.module';

import { SelectdevicesPage } from './selectdevices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectdevicesPageRoutingModule
  ],
  declarations: [SelectdevicesPage]
})
export class SelectdevicesPageModule {}
