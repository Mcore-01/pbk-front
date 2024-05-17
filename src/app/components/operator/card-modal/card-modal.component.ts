import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IPbkCategory} from "../../../models/pbkcategory";
import {IDisplayModel} from "../../../models/displaymodel";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MccListComponent} from "../mcc-list/mcc-list.component";
import {ModalComponent} from "../../modal/modal.component";
import {ICard} from "../../../models/card";
import {CashbackListComponent} from "../cashback-list/cashback-list.component";
import {HttpClientModule} from "@angular/common/http";
import {OperatorService} from "../../../services/operator.service";
import {ICardCashback} from "../../../models/cardcashback";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {IBank} from "../../../models/bank";
import {IMcc} from "../../../models/mcc";
import {map, Observable, startWith, switchMap} from "rxjs";
import {ITypeCard} from "../../../models/typecard";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'card-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MccListComponent,
    ModalComponent,
    CashbackListComponent,
    HttpClientModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    ReactiveFormsModule,
    MatSelect,
    NgForOf
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css',
  providers:[OperatorService]
})
export class CardModalComponent implements OnInit {
  selectedBank: IBank | null;
  bankControl = new FormControl<string | IBank>('');
  filteredBank: Observable<IBank[]>;

  typeCards: ITypeCard[];

  selectedTypeCard: ITypeCard | null;
  typeCardControl = new FormControl<string | ITypeCard>('');

  constructor(
      private operatorService: OperatorService,
      public dialogRef: DialogRef<ICard>,
      @Inject(DIALOG_DATA) public data: ICard,
  ) {
  }

  ngOnInit(): void {
    const card = this.data;
    if (card.id != 0){
      const bank: IBank = {id: card.bank.id, name: card.bank.displayName};
      this.selectedBank = bank;
      this.bankControl.setValue(bank);

      const typeCard: ITypeCard = {id: card.typeCard.id, name: card.typeCard.displayName};
      this.selectedTypeCard = typeCard;
      this.typeCardControl.setValue(typeCard);
    }

    this.filteredBank = this.bankControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return this.operatorService.getBanks(1, 10, name as string);
        }),
        map(response => response.items)
    );

    this.operatorService.getTypeCards().subscribe({
      next:(data:ITypeCard[]) => this.typeCards = data,
      error: error => {
        console.log(error);
      }
    });
  }

  closeDialog(event:any){
    this.dialogRef.close();
  }

  displayMemberBank(bank: IBank): string {
    return bank && bank.name ? bank.name : '';
  }

  optionSelectedBank(event: any) {
    this.selectedBank = event.option.value;
  }

  optionSelectedTypeCard(event: any) {
    this.selectedTypeCard = event.value;
    console.log(this.selectedTypeCard)
  }

  updateCashbacks(updatedCashbacks: ICardCashback[]){
    this.data.cashbacks = updatedCashbacks;
  }

  saveCardData(){
    if (this.selectedBank && this.selectedTypeCard){
      const card = this.data;
      card.bank = {id: this.selectedBank.id, displayName: this.selectedBank?.name};
      card.typeCard = {id: this.selectedTypeCard.id, displayName: this.selectedTypeCard.name};
      this.dialogRef.close(card);
    }
    else{
      this.dialogRef.close();
    }
  }
}
