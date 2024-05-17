import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IBank} from "../../../models/bank";
import {IPbkCategory} from "../../../models/pbkcategory";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {MccListComponent} from "../mcc-list/mcc-list.component";
import {HttpClientModule} from "@angular/common/http";
import {OperatorService} from "../../../services/operator.service";
import {IDisplayModel} from "../../../models/displaymodel";

@Component({
  selector: 'category-modal',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ModalComponent,
        MccListComponent,
        HttpClientModule
    ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css',
    providers:[OperatorService]
})
export class CategoryModalComponent {
  constructor(
      private cdRef: ChangeDetectorRef,
      public dialogRef: DialogRef<IPbkCategory>,
      @Inject(DIALOG_DATA) public data: IPbkCategory,
  ) {
  }

  closeDialog(event:any){
    this.dialogRef.close()
  }

  addMcc(mcc: IDisplayModel<string>){
      //система боль, потом исправлю
      const mccCopies  = Object.assign([], this.data.mccs);
      mccCopies.push(mcc);

      this.data.mccs = mccCopies;
      console.log(this.data.mccs)
      this.cdRef.detectChanges();
  }

  deleteMcc(id: string){
      this.data.mccs = this.data.mccs.filter(p => p.id != id);
      this.cdRef.detectChanges();
  }
}