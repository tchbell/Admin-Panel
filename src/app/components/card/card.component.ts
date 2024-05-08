import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import * as airportData from "../../../assets/airports.json";
import { HttpClient } from '@angular/common/http';

interface AirportDataInterFace {
  "name": string,
  "code": string,
  "city": string,
  "country": string
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  options: AirportDataInterFace[] = [];
  filteredOptions: Observable<AirportDataInterFace[]> | undefined;
  filteredOptionsDuplicate: Observable<AirportDataInterFace[]> | undefined;
  data: any = airportData;

  userForm = new FormGroup({
    userLocation: new FormControl(<AirportDataInterFace>{}),
    userDesiredLocation: new FormControl(<AirportDataInterFace>{}),
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAirportData().subscribe(data => {
      this.options = data;
    });

    // this.filteredOptions = this.userForm.get('userLocation')?.valueChanges.pipe(
    //   filter(value => !!value),
    //   startWith(''),
    //   map(value => this._filter(value || ''))
    // );

    // this.filteredOptionsDuplicate = this.userForm.get('userDesiredLocation')?.valueChanges.pipe(
    //   filter(value => !!value),
    //   startWith(''),
    //   map(value => this._filter(value || ''))
    // );
    this.filteredOptions = this.createFilteredOptionsObservable(this.userForm.get('userLocation') as FormControl);
    this.filteredOptionsDuplicate = this.createFilteredOptionsObservable(this.userForm.get('userDesiredLocation') as FormControl);
  }

  public displayFn(airport?: AirportDataInterFace): string {
    return airport ? airport.name : '';
  }

  private _filter(value: string | AirportDataInterFace): AirportDataInterFace[] {
    let filterValue: string;

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (this.isAirportDataInterFace(value)) {
      filterValue = value.name.toLowerCase();
    } else {
      filterValue = '';
    }

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private getAirportData(): Observable<AirportDataInterFace[]> {
    const url = "/assets/airports.json";
    return this.http.get<AirportDataInterFace[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching airport data', error);
        return of([]);
      })
    );
  }

  private isAirportDataInterFace(value: any): value is AirportDataInterFace {
    return value && typeof value === 'object' && 'name' in value;
  }

  private createFilteredOptionsObservable(control: FormControl): Observable<any> {
    return control.valueChanges.pipe(
      filter(value => !!value),
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  public onFormSubmit() {
    console.log(this.userForm.value);
  }
}
