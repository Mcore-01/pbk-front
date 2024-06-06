import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() { }

  public loading = new BehaviorSubject<boolean>(false);
  public isLoading(state: boolean): void {
    this.loading.next(state);
  }
}