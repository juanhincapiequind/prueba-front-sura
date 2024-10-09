import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTableComponent } from './configuration-table.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

class MatDialogRefMock {
  afterClosed(){
    return of(true);
  }

  close(){}
}

describe('ConfigurationTableComponent', () => {
  let component: ConfigurationTableComponent;
  let fixture: ComponentFixture<ConfigurationTableComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [ConfigurationTableComponent],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource on ngOnINit', () => {
    component.ngOnInit();
    expect(component.dataSource).toEqual([
      { state: true, configName: 'SONAR_QUBE', observations: 'All good' },
      {
        state: false,
        configName: 'JENKINS_PIPELINE',
        observations: 'Needs review',
      },
      {
        state: false,
        configName: 'UNIT_TEST',
        observations: 'Need more tests',
      },
      { state: true, configName: 'EXCEPTIONS', observations: 'Needs review' },
    ]);
  });

  it('should open the dialog', () => {
    const dialogRefMock = new MatDialogRefMock();
    dialogSpy.open.and.returnValue(dialogRefMock)

    component.openDialog();
    expect(dialogSpy.open).toHaveBeenCalledWith(SaveDialogComponent);

  })
});
