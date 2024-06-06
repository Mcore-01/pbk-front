import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SpinnerService} from "./services/spinner.service";
import {AsyncPipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthPageComponent, HttpClientModule, MatProgressSpinner, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pbk-front';
  constructor(private spinner: SpinnerService) {
  }
  public loading$ = this.spinner.loading.asObservable()
}