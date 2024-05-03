import {Component, Inject} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {IBank} from "../../../models/bank";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../modal/modal.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'bank-modal',
  standalone: true,
  imports: [
    FormsModule,
    ModalComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormField,
    MatInputModule,
    MatInput
  ],
  templateUrl: './bank-modal.html',
  styleUrl: './bank-modal.css'
})
export class BankModal {
  constructor(
      public dialogRef: DialogRef<IBank>,
      @Inject(DIALOG_DATA) public data: IBank,
  ) {}

  closeDialog(event:any){
   this.dialogRef.close()
  }
}
