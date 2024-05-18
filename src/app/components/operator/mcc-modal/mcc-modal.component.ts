import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {IMcc} from "../../../models/mcc";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {OperatorService} from "../../../services/operator.service";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IOutlet} from "../../../models/outlet";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../../modal/modal.component";
import {HttpClientModule} from "@angular/common/http";
import {IDisplayModel} from "../../../models/displaymodel";

@Component({
  selector: 'mcc-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './mcc-modal.component.html',
  styleUrl: './mcc-modal.component.css',
  providers:[OperatorService]
})
export class MccModalComponent implements OnInit{
  selectedMCC: IMcc | null;

  subs: Subscription[] = [];
  constructor(
      private operatorService: OperatorService,
      private cdRef: ChangeDetectorRef,
      public dialogRef: DialogRef<IDisplayModel<string>>,
      @Inject(DIALOG_DATA) public data: IDisplayModel<string>,
  ) {}

  closeDialog(event:any){

    if (this.selectedMCC) {
      const mccData = this.data;
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
    if (this.data.id != ""){
      const mcc: IMcc = {code: this.data.id, name: this.data.displayName};
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

  getDisplayName(option: any){
    return `${option.name} (${option.code})`
  }
}