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
import {OperatorService} from "../../../services/operator.service";
import {Dialog} from "@angular/cdk/dialog";
import {Operation} from "../../../enums/operation";
import {IOutlet} from "../../../models/outlet";
import {OutletModalComponent} from "../outlet-modal/outlet-modal.component";

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
export class OutletListComponent implements OnInit, OnDestroy{
  subs: Subscription[] = [];

  outlets: IOutlet[];

  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];

  pageCount: number = 1;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  searchString: string | null = null;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'shop', 'mcc', 'actions'];
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
    const sub = this.operatorService.getOutlets(this.pageIndex + 1, this.pageSize, this.searchString)
        .subscribe({
          next: (data) =>{
            this.pageCount = data.totalCount;
            this.outlets = data.items;
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
      console.log("Результа: " + result?.name)
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
    this.openDialog({id: 0, name: "", shop: {id: 0, displayName: "не выбран"}, mcc: {id: "0", displayName: "не выбран"}}, Operation.Create);
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