import { Component } from '@angular/core';
import {RegComponent} from "../../components/reg/reg.component";

@Component({
  selector: 'app-reg-page',
  standalone: true,
    imports: [
        RegComponent
    ],
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.css'
})
export class RegPageComponent {

}
