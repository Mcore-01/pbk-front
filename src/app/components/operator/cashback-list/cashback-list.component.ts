import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {OperatorService} from "../../../services/operator.service";
import {Dialog} from "@angular/cdk/dialog";
import {ICardCashback} from "../../../models/cardcashback";
import {CashbackModalComponent} from "../cashback-modal/cashback-modal.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Operation} from "../../../enums/operation";

@Component({
  selector: 'cashback-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './cashback-list.component.html',
  styleUrl: './cashback-list.component.css',
  providers:[OperatorService]
})
export class CashbackListComponent implements  OnDestroy{
  subs: Subscription[] = [];


  @Input() cashbacks: ICardCashback[] = [];

  @Output() updateCashbacks = new EventEmitter<ICardCashback[]>();
  displayedColumns: string[] = ['category', 'percent', 'actions'];
  constructor(private operatorService: OperatorService, public dialog: Dialog, private cdRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }

  openDialog(data: ICardCashback, operation: Operation){

    const oldValueCategory = Object.assign({},  data.category);
    const dialogRef = this.dialog.open<ICardCashback>(CashbackModalComponent, {
      data: data,
    });

    const sub = dialogRef.closed.subscribe(result => {
      if (result){
        const hasElement = this.cashbacks.some(p => p.category.id == result.category.id);
        if (!hasElement && operation == Operation.Create){
          console.log(!hasElement && operation == Operation.Create);
          const cashbackCopies  = Object.assign([], this.cashbacks);
          cashbackCopies.push(result);

          this.cashbacks = cashbackCopies;
        }
        else if (operation == Operation.Update){

          const updatedItems = this.cashbacks.map(item =>
              item.category.id === oldValueCategory.id ? result : item
          );

          this.cashbacks = updatedItems;
        }
        this.updateCashbacks.emit(this.cashbacks);
        this.cdRef.detectChanges();
      }
    });
    this.subs.push(sub);
  }

  create(){
    this.openDialog({id: 0, percent: 0, category: {id: 0, displayName: ""}}, Operation.Create);
  }

  edit(cashback: ICardCashback) {
    this.openDialog(cashback, Operation.Update);
  }

  delete(cashback: ICardCashback) {
    this.cashbacks = this.cashbacks.filter(p => p.category.id == cashback.id);
    this.updateCashbacks.emit(this.cashbacks);
    this.cdRef.detectChanges();
  }
}
