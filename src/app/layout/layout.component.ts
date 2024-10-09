import { Component } from '@angular/core';
import { ProjectSelectorComponent } from '../routes/configurator/project-selector/project-selector.component';
import { HeaderComponent } from './header/header.component';
import { ConfigurationTableComponent } from '../routes/configurator/configuration-table/configuration-table.component';
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ProjectSelectorComponent,
    HeaderComponent,
    ConfigurationTableComponent,
    FooterComponent,
    MatCardModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
