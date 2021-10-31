import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AngularJssipComponent } from './angular-jssip.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DailerComponent } from './dailer/dailer.component';
import { DailerInputerComponent } from './dailer/dailer-inputer/dailer-inputer.component';


@NgModule({
  declarations: [AngularJssipComponent, DailerComponent, DailerInputerComponent],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    FlexLayoutModule
  ],
  exports: [AngularJssipComponent]
})
export class AngularJssipModule { }
