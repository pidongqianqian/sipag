import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularJssipComponent } from './angular-jssip.component';



@NgModule({
  declarations: [AngularJssipComponent],
  imports: [
    OverlayModule
  ],
  exports: [AngularJssipComponent]
})
export class AngularJssipModule { }
