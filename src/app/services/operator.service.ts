import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBank} from "../models/bank";
import {tap} from "rxjs";
import {IPaginatedData} from "../response-models/PaginatedData";

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

    constructor(private http:HttpClient) { }


    getBanks(pageNumber: number, pageSize: number, searchString: string | null){
        let url = `/api/operator/Bank?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if (searchString){
            url += `&SearchString=${searchString}`;
        }
        return this.http.get<IPaginatedData>(url);
    }
    getBank(id: number){
        return this.http.get<IBank>(`/api/operator/Bank/${id}`).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    createBank(data: IBank){
      return this.http.post("/api/operator/Bank", data).pipe(
          tap(response =>{
              console.log(response);
          })
      )
    }
    updateBank(data: IBank){
      return this.http.put("/api/operator/Bank", data).pipe(
          tap(response =>{
              console.log(response);
          })
      )
    }
    deleteBank(id: number){
    return this.http.delete(`/api/operator/Bank/${id}`).pipe(
        tap(response =>{
            console.log(response);
        })
        )
    }

}
