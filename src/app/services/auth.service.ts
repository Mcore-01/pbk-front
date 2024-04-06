import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Logintypes} from "../enums/logintype";
import {IRegisterRequest} from "../models/register";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }
    //Запрашиваем у сервера токен, если статус 200, то добавляем токен в локальное хранилище
    createToken(loginType:Logintypes, login: string, password:string){

        const data = {LoginType: loginType, Value: login, Password: password};
        return  this.http.post<any>("/api/Account/login", data).pipe(
            tap(response=>{
                if (response) {
                    localStorage.setItem('jwt_token', response.token);
                }
            })
        );
    }

    registration(data: IRegisterRequest){
        return  this.http.post<any>("/api/Account/register", data).pipe(
            tap(response=>{
                if (response) {
                    localStorage.setItem('jwt_token', response.token);
                }
            })
        );
    }
    removeToken(){
        localStorage.removeItem("jwt_token");
    }
}
