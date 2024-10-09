import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Observable, startWith, map } from 'rxjs';
import { ConfigurationTableComponent } from '../configuration-table/configuration-table.component';
import { GetApplicationsService } from '../../../core/services/get-applications.service';
import {
  TempApplication,
  TempDomain,
} from '../../../core/models/application-model';

@Component({
  selector: 'app-project-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    ConfigurationTableComponent,
  ],
  templateUrl: './project-selector.component.html',
  styleUrl: './project-selector.component.scss',
})
export class ProjectSelectorComponent {
  selectedApplication?: any;
  domainControl = new FormControl();
  applicationControl = new FormControl();

  domains: TempDomain[] = [
    { id: 0, name: 'General' },
    { id: 1, name: 'Dominio A' },
    { id: 2, name: 'Dominio B' },
  ];

  applications: TempApplication[] = [
    { id: 1, name: 'App 1', domainId: 1 },
    { id: 2, name: 'App 2', domainId: 1 },
    { id: 3, name: 'App 3', domainId: 2 },
    { id: 4, name: 'App 4', domainId: 2 },
  ];

  filteredApplications!: Observable<TempApplication[]>;

  ngOnInit() {
    this.domainControl.setValue(this.domains[0]);
    this.filteredApplications = this.applicationControl.valueChanges.pipe(
      startWith(''),
      map((input) => this.filterApplications(this.domainControl.value, input))
    );
    this.domainControl.valueChanges.subscribe((domain) => {
      this.applicationControl.reset(); // Reset application on domain change
      this.filteredApplications = this.applicationControl.valueChanges.pipe(
        startWith(''),
        map((input) => this.filterApplications(domain, input))
      );
    });
  }

  filterApplications(
    selectedDomain: TempDomain,
    applicationInput: string
  ): TempApplication[] {
    const filterValue = applicationInput ? applicationInput.toLowerCase() : '';
    return this.applications.filter((app) => {
      const matchesDomain =
        selectedDomain.name === 'General' || app.domainId === selectedDomain.id;
      const matchesInput = app.name.toLowerCase().includes(filterValue);
      return matchesDomain && matchesInput;
    });
  }

  onApplicationSelected(app: TempApplication) {
    this.applicationControl.setValue(app.name);
  }
}
