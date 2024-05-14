import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBank} from "../models/bank";
import {tap} from "rxjs";
import {IPaginatedData} from "../response-models/PaginatedData";
import {IOutlet} from "../models/outlet";
import {IShop} from "../models/shop";

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

    getOutlets(pageNumber: number, pageSize: number, searchString: string | null){
        let url = `/api/operator/Outlet?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if (searchString){
            url += `&SearchString=${searchString}`;
        }
        return this.http.get<IPaginatedData>(url);
    }
    getOutlet(id: number){
        return this.http.get<IOutlet>(`/api/operator/Outlet/${id}`).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    createOutlet(data: IOutlet){
        return this.http.post("/api/operator/Outlet", data).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    updateOutlet(data: IOutlet){
        return this.http.put("/api/operator/Outlet", data).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    deleteOutlet(id: number){
        return this.http.delete(`/api/operator/Outlet/${id}`).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }

    getShops(pageNumber: number, pageSize: number, searchString: string | null){
        let url = `/api/operator/Shop?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if (searchString){
            url += `&SearchString=${searchString}`;
        }
        return this.http.get<IPaginatedData>(url);
    }

    getShop(id: number){
        return this.http.get<IShop>(`/api/operator/Shop/${id}`).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    createShop(data: IShop){
        return this.http.post("/api/operator/Shop", data).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    updateShop(data: IShop){
        return this.http.put("/api/operator/Shop", data).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }
    deleteShop(id: number){
        return this.http.delete(`/api/operator/Shop/${id}`).pipe(
            tap(response =>{
                console.log(response);
            })
        )
    }

    getAllMCC(pageNumber: number, pageSize: number, searchString: string | null){
        let url = `/api/operator/Mcc?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if (searchString){
            url += `&SearchString=${searchString}`;
        }
        return this.http.get<IPaginatedData>(url);
    }

}
