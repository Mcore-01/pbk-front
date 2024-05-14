import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IBank} from "../../../models/bank";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {IShop} from "../../../models/shop";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {OperatorService} from "../../../services/operator.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {IOutlet} from "../../../models/outlet";
import {IMcc} from "../../../models/mcc";

@Component({
  selector: 'outlet-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ModalComponent,
    MatAutocomplete,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatOption,
    HttpClientModule
  ],
  templateUrl: './outlet-modal.component.html',
  styleUrl: './outlet-modal.component.css',
  providers: [OperatorService]
})

export class OutletModalComponent implements OnInit{
  selectedMCC: IMcc | null;

  subs: Subscription[] = [];
  constructor(
      private operatorService: OperatorService,
      private cdRef: ChangeDetectorRef,
      public dialogRef: DialogRef<IOutlet>,
      @Inject(DIALOG_DATA) public data: IOutlet,
  ) {}

  closeDialog(event:any){

    if (this.selectedMCC) {
      const mccData = this.data.mcc;
      mccData.id = this.selectedMCC.code;
      mccData.displayName = this.selectedMCC.name;

      this.dialogRef.close(this.data);
    }
    else {
      this.dialogRef.close();
    }

  }
  myControl = new FormControl<string | IMcc>('');

  filteredMCC: Observable<IMcc[]>;

  ngOnInit() {
    const mccData = this.data.mcc;
    if (mccData.id != ""){
      const mcc: IMcc = {code: mccData.id, name: mccData.displayName};
      this.selectedMCC = mcc;
      this.myControl.setValue(mcc);
    }

    this.filteredMCC = this.myControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return this.operatorService.getAllMCC(1, 10, name as string);
        }),
        map(response => response.items)
    );
  }

  displayFn(mcc: IMcc): string {
    return mcc && mcc.name ? mcc.name : '';
  }
  optionSelected(event: any) {
    this.selectedMCC = event.option.value;

    console.log(this.selectedMCC)
  }
}
