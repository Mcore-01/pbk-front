import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ModalComponent} from "../modal/modal.component";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'notification-modal',
  standalone: true,
    imports: [
        ModalComponent,
        MatButton
    ],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent {
    constructor(
        public dialogRef: DialogRef,
        @Inject(DIALOG_DATA) public data: { label: string }
    ) {}
}
