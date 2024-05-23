import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  providers: [AuthService]
})
export class MainPageComponent {
  constructor(private router: Router, private authService: AuthService) {
  }
}
