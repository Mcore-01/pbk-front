import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {errorDict} from "../../error-config";

@Component({
  selector: 'app-error-page',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit{
  errorCode: number;
  errorMessage: string;
  errorAnnotation: string;

  constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.route.data.subscribe(data => {
        const error = errorDict.get(data['errorCode']);
        if (error){
          this.errorCode = error.code;
          this.errorMessage = error.message;
          this.errorAnnotation = error.annotation;
        }
      });
    }
}
