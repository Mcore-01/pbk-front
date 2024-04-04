import { Component } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [HttpClientModule, FormsModule, CommonModule, RouterLink],
    templateUrl: './auth.component.html',
    styleUrl: "./auth.component.css",
    providers:[AuthService]
})
export class AuthComponent {

    isInvalidLogin: boolean = false;
    isInvalidPassword: boolean = false;
    constructor(private http: AuthService) {

    }

    authorize(form:NgForm){
        this.http.createToken(form.value.login,form.value.password).subscribe({
            next:(data: any) => console.log(data),
            error: error => {
                console.log(error);
            }
        });

    }

    removeErrorMessage(){
        /*if (this.isInvalidAuth){
            this.isInvalidAuth = !this.isInvalidAuth;
        }*/
    }
}
