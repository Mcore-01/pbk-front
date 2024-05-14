import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {OperatorService} from "../../../services/operator.service";
import {Dialog} from "@angular/cdk/dialog";
import {Operation} from "../../../enums/operation";
import {IOutlet} from "../../../models/outlet";
import {OutletModalComponent} from "../outlet-modal/outlet-modal.component";
import {IShop} from "../../../models/shop";

@Component({
  selector: 'outlet-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef,
    FormsModule
  ],
  templateUrl: './outlet-list.component.html',
  styleUrl: './outlet-list.component.css',
  providers: [OperatorService]
})
export class OutletListComponent implements  OnDestroy{
  subs: Subscription[] = [];

  @Input() shop: IShop;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(private operatorService: OperatorService, public dialog: Dialog, private cdRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }
  /*ngOnInit(): void {
    this.updateDataGrid()
  }*/


  onKeydown(event: any){
    event.preventDefault();
  }

  updateDataGrid(){
    const sub = this.operatorService.getShop(this.shop.id)
        .subscribe({
          next: (data) =>{
            this.shop = data;
            this.cdRef.detectChanges();
          }
        });

    this.subs.push(sub);
  }

  openDialog(data: IOutlet, operation: Operation){

    const dialogRef = this.dialog.open<IOutlet>(OutletModalComponent, {
      width: '250px',
      data: data,
    });

    const sub = dialogRef.closed.subscribe(result => {
      console.log("Результат: " + result?.name)
      if (result){
        if (operation == Operation.Create){
          const sub = this.operatorService.createOutlet(result).subscribe({
            next:(data:any) => this.updateDataGrid(),
            error: error => {
              console.log(error);
            }
          });
          this.subs.push(sub);
        }
        else{
          const sub = this.operatorService.updateOutlet(data).subscribe({
            next:(data:any) => this.updateDataGrid(),
            error: error => {
              console.log(error);
            }
          });
          this.subs.push(sub);
        }
      }
    });
    this.subs.push(sub);
  }

  createOutlet(){
    this.openDialog({id: 0, name: "", shop: {id: this.shop.id, displayName: this.shop.name}, mcc: {id: "", displayName: ""}}, Operation.Create);
  }

  editOutlet(id: number) {
    const sub = this.operatorService.getOutlet(id).subscribe({
      next:(data:IOutlet) => {
        this.openDialog(data, Operation.Update);
      },
      error: error => {
        console.log(error);
        return;
      },
    });

    this.subs.push(sub);
  }

  deleteOutlet(id: number) {
    const sub = this.operatorService.deleteOutlet(id).subscribe({
      next:(data:any) => this.updateDataGrid(),
      error: error => {
        console.log(error);
      }
    });
    this.subs.push(sub);
  }

}