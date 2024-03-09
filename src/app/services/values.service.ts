import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private http: HttpClient) { }

  getValues() : Observable<any> {
    return this.http.get("http://localhost:57291/api/Values");
  }
}
