import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPaginatedData} from "../response-models/PaginatedData";
import {IUserCard} from "../models/usercard";
import {IOperation} from "../models/operation";
import {IBank} from "../models/bank";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserCards(){
    let url = '/api/UserCard';
    return this.http.get<IUserCard[]>(url);
  }

  getUserOperations(){
    let url = '/api/Operation';
    return this.http.get<IOperation[]>(url);
  }

  getUserOperation(id: number){
    let url = `/api/Operation/${id}`;
    return this.http.get<IOperation>(url);
  }

  createUserOperation(data: IOperation){
    return this.http.post("/api/Operation", data);
  }
  updateUserOperation(data: IBank){
    return this.http.put("/api/Operation", data);
  }
  deleteUserOperation(id: number){
    return this.http.delete(`/api/Operation/${id}`);
  }

  deleteListUserOperation(ids: number[]){
    return this.http.request( 'delete',`/api/Operation/list`, {body: JSON.stringify(ids)});
  }
}
