import {Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ModalComponent} from "../modal/modal.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith, Subscription, switchMap} from "rxjs";
import {OperatorService} from "../../services/operator.service";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {IOutlet} from "../../models/outlet";
import {IOperation} from "../../models/operation";
import {HttpClientModule} from "@angular/common/http";
import {IMcc} from "../../models/mcc";
import {IDisplayModel} from "../../models/displaymodel";

@Component({
  selector: 'app-operation-modal',
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
        HttpClientModule,
        FormsModule
    ],
  templateUrl: './operation-modal.component.html',
  styleUrl: './operation-modal.component.css',
  providers: [OperatorService]
})
export class OperationModalComponent implements OnInit{
    selectedOutlet: IOutlet | null;
    sum: number = 1000;
    outletControl = new FormControl<string | IOutlet>('');

    filteredOutlet: Observable<IOutlet[]>;
    subs: Subscription[] = [];
    constructor(
        private operatorService: OperatorService,
        public dialogRef: DialogRef<IOperation>,
        @Inject(DIALOG_DATA) public data: IOperation
    ) {}

    closeDialog(event:any){
        if (this.selectedOutlet) {
            let data: IOperation = {
                id: 0, sum: this.sum, outlet: {id: this.selectedOutlet.id, displayName: this.selectedOutlet.name}
            }
            if (this.data){
                data = {
                    id: this.data.id, sum: this.sum, outlet: {id: this.selectedOutlet.id, displayName: this.selectedOutlet.name}
                }
            }

            this.dialogRef.close(data);
        }
        else {
            this.dialogRef.close();
        }

    }

    ngOnInit() {
        if (this.data){
            const outletData = this.data.outlet;
            const outlet: IOutlet = {id: outletData.id, name: outletData.displayName, mcc: {} as IDisplayModel<string>, shop: {} as IDisplayModel<number>};
            this.selectedOutlet = outlet;
            this.sum = this.data.sum;
            this.outletControl.setValue(outlet);
        }
        this.filteredOutlet = this.outletControl.valueChanges.pipe(
            startWith(''),
            switchMap(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return this.operatorService.getOutlets(1, 10, name as string);
            }),
            map(response => response.items)
        );
    }

    displayFn(outlet: IOutlet): string {
        return outlet && outlet.name ? outlet.name  : '';
    }
    optionSelected(event: any) {
        this.selectedOutlet = event.option.value;
    }
}
