import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectorComponent } from './project-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  TempApplication,
  TempDomain,
} from '../../../core/models/application-model';

describe('ProjectSelectorComponent', () => {
  let component: ProjectSelectorComponent;
  let fixture: ComponentFixture<ProjectSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectSelectorComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default domain on init', () => {
    expect(component.domainControl.value).toEqual(component.domains[0]);
  });

  it('should filter applications based on domain and inputs', () => {
    const domain: TempDomain = { id: 1, name: 'Dominio A' };
    component.domainControl.setValue(domain);
    const input = 'App 1';
    const filteredApps = component.filterApplications(domain, input);
    expect(filteredApps.length).toBe(1);
    expect(filteredApps[0].name).toBe('App 1');
  });

  it('should reset application when the domain changes and the application doesnt exist in the list', () => {
    component.domainControl.setValue(component.domains[1]);
    component.applicationControl.setValue('App 1');
    component.domainControl.setValue(component.domains[2]);
    expect(component.applicationControl.value).toBe(null);
  });

  it('should update the application control on application selection', () => {
    const app: TempApplication = { id: 1, name: 'App 1', domainId: 1 };
    component.onApplicationSelected(app);
    expect(component.applicationControl.value).toBe('App 1');
  });

  it('should filter the applications correctly for "General" domain', () => {
    const input = "App";
    const domain: TempDomain = {id: 0, name:"General"};
    const filteredApp = component.filterApplications(domain, input);

    expect(filteredApp.length).toBe(4)
  })
});
