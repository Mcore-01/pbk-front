import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IBank} from "../../../models/bank";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {IShop} from "../../../models/shop";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {OperatorService} from "../../../services/operator.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

@Component({
  selector: 'outlet-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ModalComponent,
    MatAutocomplete,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatOption,
    HttpClientModule
  ],
  templateUrl: './outlet-modal.component.html',
  styleUrl: './outlet-modal.component.css',
  providers: [OperatorService]
})

export class OutletModalComponent implements OnInit{
  selectedShop: IShop | null;
  subs: Subscription[] = [];
  constructor(
      private operatorService: OperatorService,
      private cdRef: ChangeDetectorRef,
      public dialogRef: DialogRef<IBank>,
      @Inject(DIALOG_DATA) public data: IBank,
  ) {}

  closeDialog(event:any){
    this.dialogRef.close()
  }
  myControl = new FormControl<string | IShop>('');

  filteredOptions: Observable<IShop[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return this.operatorService.getShops(1, 10, name as string);
        }),
        map(response => response.items)
    );
  }

  displayFn(shop: IShop): string {
    return shop && shop.name ? shop.name : '';
  }
  optionSelected(event: any) {
    this.selectedShop = event.option.value;

    console.log(this.selectedShop)
  }
}
