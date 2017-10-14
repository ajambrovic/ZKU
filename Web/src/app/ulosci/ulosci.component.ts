import { UlosciService } from './ulosci.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulosci',
  templateUrl: './ulosci.component.html',
  styleUrls: ['./ulosci.component.css']
})
export class UlosciComponent {
  ulosci: Object[];
  constructor(private usersService: UlosciService) { }

}
