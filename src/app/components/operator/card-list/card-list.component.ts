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
import {CategoryModalComponent} from "../category-modal/category-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {ICard} from "../../../models/card";
import {CardModalComponent} from "../card-modal/card-modal.component";

@Component({
  selector: 'app-card-list',
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
    MatHeaderCellDef,
    HttpClientModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
  providers:[OperatorService]
})
export class CardListComponent implements OnInit, OnDestroy{
  subs: Subscription[] = [];

  categories: ICard[];

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
  displayedColumns: string[] = ['id', 'name', 'bank', 'typeCard', 'actions'];
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
    const sub = this.operatorService.getCards(this.pageIndex + 1, this.pageSize, this.searchString)
        .subscribe({
          next: (data) =>{
            this.pageCount = data.totalCount;
            this.categories = data.items;
            this.cdRef.detectChanges();
          }
        });

    this.subs.push(sub);
  }

  openDialog(data: ICard, operation: Operation){

    const dialogRef = this.dialog.open<ICard>(CardModalComponent, {
      data: data,
    });

    const sub = dialogRef.closed.subscribe(result => {
      if (result){
        if (operation == Operation.Create){
          const sub = this.operatorService.createCard(result).subscribe({
            next:(data:any) => this.updateDataGrid(),
            error: error => {
              console.log(error);
            }
          });
          this.subs.push(sub);
        }
        else{
          const sub = this.operatorService.updateCard(data).subscribe({
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

  create(){
    this.openDialog({id: 0, name: "", cashbacks: [], bank:{id: 0, displayName: ""}, typeCard: {id: 0, displayName: ""}}, Operation.Create);
  }

  edit(id: number) {
    const sub = this.operatorService.getCard(id).subscribe({
      next:(data:ICard) => {
        this.openDialog(data, Operation.Update);
      },
      error: error => {
        console.log(error);
        return;
      },
    });

    this.subs.push(sub);
  }

  delete(id: number) {
    const sub = this.operatorService.deleteCard(id).subscribe({
      next:(data:any) => this.updateDataGrid(),
      error: error => {
        console.log(error);
      }
    });
    this.subs.push(sub);
  }
}

