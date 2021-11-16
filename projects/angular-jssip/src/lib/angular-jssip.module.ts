import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AngularJssipComponent } from './angular-jssip.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialerComponent } from './dailer/dialer.component';
import { DailerInputerComponent } from './dailer/dailer-inputer/dailer-inputer.component';
import { DtmfInputerComponent } from './dailer/dtmf-inputer/dtmf-inputer.component';
import { FunctionPadComponent } from './dailer/function-pad/function-pad.component';


@NgModule({
  declarations: [AngularJssipComponent, DialerComponent, DailerInputerComponent, DtmfInputerComponent, FunctionPadComponent],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    FlexLayoutModule
  ],
  exports: [AngularJssipComponent]
})
export class AngularJssipModule { }
