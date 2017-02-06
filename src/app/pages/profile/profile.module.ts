import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing }       from './profile.routing';

import { Profile } from './profile.component';



@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    routing,

  //  Ng2SelectModule
  ],
  declarations: [
    Profile,

  ]
})
export default class FormsModule {}
