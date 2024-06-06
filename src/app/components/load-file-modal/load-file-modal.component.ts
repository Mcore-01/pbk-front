import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {MatButton} from "@angular/material/button";
import {DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: 'load-file-modal',
  standalone: true,
    imports: [
        ModalComponent,
        MatButton
    ],
  templateUrl: './load-file-modal.component.html',
  styleUrl: './load-file-modal.component.css'
})
export class LoadFileModalComponent {
    file: File | null;
    fileName: string = '';
    fileSelected: boolean = false;
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    constructor(
        public dialogRef: DialogRef<File>
    ) {}

    clickFileInput() {
        this.fileInput.nativeElement.click();
    }
    closeDialog(){
        if (this.file)
            this.dialogRef.close(this.file);
        else
            this.dialogRef.close();
    }

    fileChanged(event: any){
        let firstFile = event.target.files[0];
        if (firstFile){
            this.file = firstFile;
            this.fileSelected = true;
            this.fileName = firstFile.name;
        }
    }
}
