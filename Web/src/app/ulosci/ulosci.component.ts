import { UlosciService } from './ulosci.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
declare var jsPDF: any; // Important

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

  isObject(o) {
    return o instanceof Object && o.constructor === Object;
  }

  print() {
    // Default export is a4 paper, portrait, using milimeters for units
    const doc = new jsPDF();

    const col = ['ID', 'ID institucije', 'Status harmonizacije', 'Vlasnici'];
    const rows = [];

    this.ulosci.forEach(ulozak => {
      const row = [];
      const that = this;
      // tslint:disable-next-line:forin
      for (const key in ulozak) {
        if (that.isObject(ulozak[key]) && Object.keys(ulozak[key])) {
          const subKey = ulozak[key][Object.keys(ulozak[key])[0]];
          if (!!subKey && that.isObject(subKey) && Object.keys(subKey)) {
            const value = subKey[Object.keys(subKey)[0]];
            row.push(value);
          } else {
            const owners = [];
            if (Array.isArray(subKey)) {
              subKey.forEach(owner => {
                if (!!owner && that.isObject(owner) && Object.keys(owner)) {
                  const value = owner[Object.keys(owner)[0]][0];
                  if (!!value && that.isObject(value) && Object.keys(value)) {
                    const subValue = value[Object.keys(value)[0]];
                    if (!!subValue && that.isObject(subValue) && Object.keys(subValue)) {
                      const subSubValue = subValue[Object.keys(subValue)[0]];
                      row.push(subSubValue);
                    }
                   
                  }
                }
              });
            }
            row.push(owners);
          }
        } else {
          row.push(ulozak[key]);
        }
      }
      rows.push(row);
    });

    doc.autoTable(col, rows);
    doc.save('a4.pdf');
  }
}
