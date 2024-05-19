import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ValuesService} from "../../services/values.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styles: ``,
  providers: [ValuesService, AuthService]
})
export class MainPageComponent {
  constructor(private router: Router,private http: ValuesService, private httpAuth: AuthService) {
  }
  openAuthPage(){
    this.router.navigate(['/auth']);
  }
  getValues(){
    this.http .getValues().subscribe({
      next: (data:any) =>{
        console.log(data);
      }
    })
  }


  giveMeUnlimitedPower(){
    this.router.navigate(['/operator']);
  }
}
