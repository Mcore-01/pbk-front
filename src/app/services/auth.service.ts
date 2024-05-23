import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {IRegisterRequest} from "../models/register";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }
    //Запрашиваем у сервера токен, если статус 200, то добавляем токен в локальное хранилище
    createToken(login: string, password:string){

        const data = {Login: login, Password: password};
        return  this.http.post<any>("/api/Account/login", data).pipe(
            tap(response=>{
                if (response) {
                    localStorage.setItem('jwtToken', response.token);
                    localStorage.setItem('userName', response.username);
                    localStorage.setItem('userRole', response.role);
                }
            })
        );
    }

    registration(data: IRegisterRequest){
        return  this.http.post<any>("/api/Account/register", data).pipe(
            tap(response=>{
                if (response) {
                    localStorage.setItem('jwtToken', response.token);
                    localStorage.setItem('userName', response.username);
                    localStorage.setItem('userRole', response.role);
                }
            })
        );
    }

    logout(){
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
    }

    isOperator(){
        const role = localStorage.getItem("userRole");
        if (role){
            return role == 'Operator';
        }

        return false;
    }
}
