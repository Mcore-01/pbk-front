import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Output() isBackgroundClicked = new EventEmitter<boolean>();
  protected readonly console = console;

  closeModal(){
    this.isBackgroundClicked.emit(true);
  }
}
