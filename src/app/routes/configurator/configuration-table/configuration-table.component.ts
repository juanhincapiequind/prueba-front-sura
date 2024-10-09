import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { Config } from '../../../core/models/application-model';

@Component({
  selector: 'app-configuration-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './configuration-table.component.html',
  styleUrl: './configuration-table.component.scss',
})
export class ConfigurationTableComponent {
 
  @Input() selectedDomain!: any;
  @Input() selectedApplication: string = '';

  displayedColumns: string[] = ['state', 'configName', 'observations'];
  dataSource: Config[] = [];
  isTableVisible: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): any {
    this.initializeDataSource();
    setTimeout(() => { this.isTableVisible = true}, 1500)
    
  }

  private initializeDataSource(): void {
    this.dataSource = [
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
    ];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Cambios realizados');
      } else {
        console.log('Cancelados los cambios');
      }
    });
  }
}
