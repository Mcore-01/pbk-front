import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'welcome-page',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
  providers: [AuthService]
})
export class WelcomePageComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  openAuthPage(){
    this.router.navigate(['/auth']).then();
  }
}
