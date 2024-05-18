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
import {IShop} from "../../../models/shop";
import {ShopModalComponent} from "../shop-modal/shop-modal.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'shop-list',
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
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css',
  providers:[OperatorService]
})
export class ShopListComponent implements OnInit, OnDestroy{
    subs: Subscription[] = [];

    shops: IShop[];

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
        const sub = this.operatorService.getShops(this.pageIndex + 1, this.pageSize, this.searchString)
            .subscribe({
                next: (data) =>{
                    this.pageCount = data.totalCount;
                    this.shops = data.items;
                    this.cdRef.detectChanges();
                }
            });

        this.subs.push(sub);
    }

    openDialog(data: IShop, operation: Operation){
        const dialogRef = this.dialog.open<IShop>(ShopModalComponent, {
            width: '250px',
            data: {operation: operation, shop: data}
        });

        const sub = dialogRef.closed.subscribe(result => {
            console.log("Результа: " + result?.name)
            if (result){
                if (operation == Operation.Create){
                    const sub = this.operatorService.createShop(result).subscribe({
                        next:(data:any) => this.updateDataGrid(),
                        error: error => {
                            console.log(error);
                        }
                    });
                    this.subs.push(sub);
                }
                else{
                    const sub = this.operatorService.updateShop(data).subscribe({
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
        this.openDialog({id: 0, name: "", outlets: []}, Operation.Create);
    }

    edit(id: number) {
        const sub = this.operatorService.getShop(id).subscribe({
            next:(data:IShop) => {
                this.openDialog(data, Operation.Update);
            },
            error: error => {
                console.log(error);
                return;
            },
        });

        this.subs.push(sub);
    }
    view(id: number) {
        const sub = this.operatorService.getShop(id).subscribe({
            next:(data:IShop) => {
                this.openDialog(data, Operation.View);
            },
            error: error => {
                console.log(error);
                return;
            },
        });

        this.subs.push(sub);
    }
    delete(id: number) {
        const sub = this.operatorService.deleteShop(id).subscribe({
            next:(data:any) => this.updateDataGrid(),
            error: error => {
                console.log(error);
            }
        });
        this.subs.push(sub);
    }
}
