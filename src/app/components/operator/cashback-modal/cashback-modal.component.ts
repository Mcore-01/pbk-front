import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {IMcc} from "../../../models/mcc";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {OperatorService} from "../../../services/operator.service";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IDisplayModel} from "../../../models/displaymodel";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {ICardCashback} from "../../../models/cardcashback";
import {IPbkCategory} from "../../../models/pbkcategory";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-cashback-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ModalComponent,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './cashback-modal.component.html',
  styleUrl: './cashback-modal.component.css',
  providers: [OperatorService]
})
export class CashbackModalComponent implements OnInit{
  selectedCategory: IPbkCategory | null;
  percent: number = 0;

  subs: Subscription[] = [];
  constructor(
      private operatorService: OperatorService,
      public dialogRef: DialogRef<ICardCashback>,
      @Inject(DIALOG_DATA) public data: ICardCashback,
  ) {}

  closeDialog(event:any){

    if (this.selectedCategory) {
      const cashbackData = Object.assign({}, this.data);
      const category = Object.assign({}, this.data.category);
      category.id = this.selectedCategory.id;
      category.displayName = this.selectedCategory.name;
      cashbackData.category = category;
      cashbackData.percent = this.percent;

      this.dialogRef.close(cashbackData);
    }
    else {
      this.dialogRef.close();
    }

  }
  myControl = new FormControl<string | IPbkCategory>('');

  filteredMCC: Observable<IPbkCategory[]>;

  ngOnInit() {
    if (this.data.id != 0){
      const category: IPbkCategory = {id: this.data.category.id, name: this.data.category.displayName, mccs:[]};
      this.selectedCategory = category;
      this.percent = this.data.percent;
      this.myControl.setValue(category);
    }

    this.filteredMCC = this.myControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return this.operatorService.getPbkCategories(1, 10, name as string);
        }),
        map(response => response.items)
    );
  }

  displayFn(mcc: IPbkCategory): string {
    return mcc && mcc.name ? mcc.name : '';
  }
  optionSelected(event: any) {
    this.selectedCategory = event.option.value;
  }
}
