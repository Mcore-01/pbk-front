import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPaginatedData} from "../response-models/PaginatedData";
import {IUserCard} from "../models/usercard";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserCards(){
    let url = '/api/UserCard';
    return this.http.get<IUserCard[]>(url);
  }
}
