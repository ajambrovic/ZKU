import { ReactiveFormsModule } from '@angular/forms';
import { UlosciService } from './ulosci.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UlosciComponent } from './ulosci.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [UlosciComponent],
  exports: [UlosciComponent],
  providers: [UlosciService]
})
export class UlosciModule { }
