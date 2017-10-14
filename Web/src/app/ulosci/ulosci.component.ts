import { UlosciService } from './ulosci.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ulosci',
  templateUrl: './ulosci.component.html',
  styleUrls: ['./ulosci.component.scss']
})
export class UlosciComponent implements OnInit {

  ulosci: Object[];
  institutions: Object[];
  mainBooks: Object[];
  form: FormGroup;
  cestice = new FormControl('');
  vlasnik = new FormControl('', );
  institucije = new FormControl('', );
  glavnaKnjiga = new FormControl('', );
  brojUloska = new FormControl('', );
  brojCestice = new FormControl('', );
  loading = false;
  error = false;

  constructor(private usersService: UlosciService, fb: FormBuilder) {
    this.form = fb.group({
      'cestice': this.cestice,
      'vlasnik': this.vlasnik,
      'institucije': this.institucije,
      'glavnaKnjiga': this.glavnaKnjiga,
      'brojUloska': this.brojUloska,
      'brojCestice': this.brojCestice
    });
  }

  ngOnInit(): void {
    this.usersService.getInstitutions().subscribe(
      itemData => { this.institutions = itemData; },
    );
  }

  onInstitucijeChange(id) {
    this.usersService.getMainBooks(id).subscribe(
      itemData => { this.mainBooks = itemData; },
    );
  }

  onSubmit() {
    this.loading = true;
    this.error = false;
    this.usersService.getData(this.form.value).subscribe(
      itemData => { this.loading = false; this.ulosci = itemData; },
      error => { this.loading = false; this.error = error; });
  }
}
