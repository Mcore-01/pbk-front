import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {IBank} from "../../../models/bank";
import {OperatorService} from "../../../services/operator.service";
import {Dialog} from "@angular/cdk/dialog";
import {Operation} from "../../../enums/operation";
import {BankModalComponent} from "../bank-modal/bank-modal.component";

@Component({
  selector: 'bank-list',
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
    FormsModule,
    MatHeaderCellDef
  ],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css',
  providers:[OperatorService]
})
export class BankListComponent implements OnInit, OnDestroy{
  subs: Subscription[] = [];

  banks: IBank[];

  pageIndex = 0;
  pageSize = 15;
  pageSizeOptions = [15, 20, 25];

  pageCount: number = 1;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  searchString: string | null = null;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(private operatorService: OperatorService, public dialog: Dialog, private cdRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.updateDataGrid()
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updateDataGrid();
  }

  onKeydown(event: any){
    event.preventDefault();
  }

  updateDataGrid(){
    console.log(`${this.searchString}`);
    const sub = this.operatorService.getBanks(this.pageIndex + 1, this.pageSize, this.searchString)
        .subscribe({
          next: (data) =>{
            this.pageCount = data.totalCount;
            this.banks = data.items;
            this.cdRef.detectChanges();
          }
        });

    this.subs.push(sub);
  }

  openDialog(data: IBank, operation: Operation){

    const dialogRef = this.dialog.open<IBank>(BankModalComponent, {
      width: '250px',
      data: data,
    });

    const sub = dialogRef.closed.subscribe(result => {
      console.log("Результа: " + result?.name)
      if (result){
        if (operation == Operation.Create){
          const sub = this.operatorService.createBank(result).subscribe({
            next:(data:any) => this.updateDataGrid(),
            error: error => {
              console.log(error);
            }
          });
          this.subs.push(sub);
        }
        else{
          const sub = this.operatorService.updateBank(data).subscribe({
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

  createBank(){
    this.openDialog({id: 0, name: ""}, Operation.Create);
  }

  editBank(id: number) {
    const sub = this.operatorService.getBank(id).subscribe({
      next:(data:IBank) => {
        this.openDialog(data, Operation.Update);
      },
      error: error => {
        console.log(error);
        return;
      },
    });

    this.subs.push(sub);
  }

  deleteBank(id: number) {
    const sub = this.operatorService.deleteBank(id).subscribe({
      next:(data:any) => this.updateDataGrid(),
      error: error => {
        console.log(error);
      }
    });
    this.subs.push(sub);
  }
}
