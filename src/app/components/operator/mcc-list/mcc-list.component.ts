import {ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IMcc} from "../../../models/mcc";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {OperatorService} from "../../../services/operator.service";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IOutlet} from "../../../models/outlet";
import {FormControl} from "@angular/forms";
import {IShop} from "../../../models/shop";
import {Operation} from "../../../enums/operation";
import {OutletModalComponent} from "../outlet-modal/outlet-modal.component";
import {IDisplayModel} from "../../../models/displaymodel";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MccModalComponent} from "../mcc-modal/mcc-modal.component";

@Component({
  selector: 'mcc-list',
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
  templateUrl: './mcc-list.component.html',
  styleUrl: './mcc-list.component.css',
  providers:[OperatorService]
})
export class MccListComponent implements  OnDestroy{
  subs: Subscription[] = [];


  @Input() mccs: IDisplayModel<string>[] = [];

  @Output() addNewMcc = new EventEmitter<IDisplayModel<string>>();
  @Output() deleteMcc = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(private operatorService: OperatorService, public dialog: Dialog, private cdRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }

  updateDataGrid(){

  }

  openDialog(data: IDisplayModel<string>){

    const dialogRef = this.dialog.open<IDisplayModel<string>>(MccModalComponent, {
      width: '250px',
      data: data,
    });

    const sub = dialogRef.closed.subscribe(result => {
      if (result){
        const hasElement = this.mccs.some(p => p.id == result.id);

        if (!hasElement){
          this.addNewMcc.emit(result);
        }
      }
    });
    this.subs.push(sub);
  }

  create(){
    this.openDialog({id: "", displayName: ""});
  }
  delete(id: string) {
    this.deleteMcc.emit(id);
  }
}
