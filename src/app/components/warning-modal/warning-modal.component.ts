import {Component, Inject} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {MatButton} from "@angular/material/button";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'warning-modal',
  standalone: true,
    imports: [
        ModalComponent,
        MatButton
    ],
  templateUrl: './warning-modal.component.html',
  styleUrl: './warning-modal.component.css'
})
export class WarningModalComponent {

    constructor(
        public dialogRef: DialogRef<boolean>,
        @Inject(DIALOG_DATA) public data: { label: string, question: string, acceptButtonLabel: string }
    ) {}
}
