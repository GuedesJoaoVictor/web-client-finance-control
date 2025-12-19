import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './pages/shared/header/header.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoadingService} from './core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web-client');

  constructor(protected loadingService: LoadingService) {}
}
