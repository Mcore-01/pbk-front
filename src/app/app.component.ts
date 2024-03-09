import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthPageComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'pbk-front';
}