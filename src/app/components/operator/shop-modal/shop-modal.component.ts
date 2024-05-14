import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {FormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {IShop} from "../../../models/shop";
import {OutletListComponent} from "../outlet-list/outlet-list.component";
import {OperatorService} from "../../../services/operator.service";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {Operation} from "../../../enums/operation";

@Component({
  selector: 'shop-modal',
  standalone: true,
    imports: [
        FormsModule,
        ModalComponent,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormField,
        MatInputModule,
        MatInput,
        OutletListComponent,
        HttpClientModule,
        NgIf
    ],
  templateUrl: './shop-modal.component.html',
  styleUrl: './shop-modal.component.css',
  providers:[OperatorService]
})
export class ShopModalComponent {

    constructor(
        public dialogRef: DialogRef<IShop>,
        @Inject(DIALOG_DATA) public data: {operation: Operation, shop: IShop},
    ) {

    }

    closeDialog(event:any){
        this.dialogRef.close()
    }

    get isViewingShop(){
        return this.data.operation == Operation.View;
    }
}
