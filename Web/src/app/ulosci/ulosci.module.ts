import { UlosciService } from './ulosci.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UlosciComponent } from './ulosci.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UlosciComponent],
  exports: [UlosciComponent],
  providers: [UlosciService]
})
export class UlosciModule { }
