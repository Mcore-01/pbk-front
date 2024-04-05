import { Component } from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [AuthComponent, CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: `./auth-page.component.css`,
  providers:[AuthService]
})
export class AuthPageComponent {
  userHasToken: boolean = localStorage.getItem("jwt-token") !== null;
  constructor(private http: AuthService) {
  }
  logout(){
    this.http.removeToken();
  }
}
