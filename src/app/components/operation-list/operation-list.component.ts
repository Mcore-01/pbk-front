import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IOperation} from "../../models/operation";
import {firstValueFrom, retry, Subscription} from "rxjs";
import {IOutlet} from "../../models/outlet";
import {OutletModalComponent} from "../operator/outlet-modal/outlet-modal.component";
import {Operation} from "../../enums/operation";
import {Dialog} from "@angular/cdk/dialog";
import {OperationModalComponent} from "../operation-modal/operation-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {OperatorService} from "../../services/operator.service";
import {WarningModalComponent} from "../warning-modal/warning-modal.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NotificationModalComponent} from "../notification-modal/notification-modal.component";

@Component({
  selector: 'operation-list',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './operation-list.component.html',
  styleUrl: './operation-list.component.css',
  providers:[UserService]
})
export class OperationListComponent implements OnInit, OnDestroy{

  @Output() clickedSelectCardButton = new EventEmitter();
  operations: IOperation[] = [];
  subs: Subscription[] = [];
  idsDelete: number[] = [];
  constructor(private userService: UserService, public dialog: Dialog) {
  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getOperations();
  }

  getOperations(){
    const subscription= this.userService.getUserOperations().subscribe({
      next:(data) =>{
        this.operations = data;
      },
      error:error=>{
        console.log(error);
      }
    });
    this.subs.push(subscription);
  }

  stateCheckboxChanged(event: any, id: number){
    if (event.target.checked){
      this.idsDelete.push(id);
    }
    else{
      this.idsDelete = this.idsDelete.filter(p => p != id);
    }
  }

  createOperation(){
    const dialogRef = this.dialog.open<IOperation>(OperationModalComponent);

    const sub = dialogRef.closed.subscribe(result => {
      if (result){
          const sub = this.userService.createUserOperation(result).subscribe({
            next:(id) => {
              result.id = id;
              this.operations.push(result);
            },
            error: error => {
              console.log(error);
            }
          });

          this.subs.push(sub);
      }
    });
    this.subs.push(sub);
  }

  updateOperation(data: IOperation){
    const dialogRef = this.dialog.open<IOperation>(OperationModalComponent,{
      data: data
    });

    const sub = dialogRef.closed.subscribe(result => {
      if (result){
        const sub = this.userService.updateUserOperation(result).subscribe({
          next:() => {
            this.getOperations();
          },
          error: error => {
            console.log(error);
          }
        });

        this.subs.push(sub);
      }
    });
    this.subs.push(sub);
  }

  async deleteOperations(){
    //список id для удаление пусть
    if (this.idsDelete.length == 0){
      return;
    }
    const label: string = 'Выбранные записи будут навсегда удалены';
    const question: string = 'Удалить записи?';
    const acceptButtonLabel: string = 'Удалить';
    const resultDialog = await this.openWarningDialog(label, question, acceptButtonLabel);
    if (resultDialog){
      const subscription= this.userService.deleteListUserOperation(this.idsDelete).subscribe({
        next:() =>{
          this.idsDelete = [];
          this.getOperations();
        },
        error:error=>{
          console.log(error);
        }
      });
      this.subs.push(subscription);return;
    }
  }

  openWarningDialog(label: string, question: string, acceptButtonLabel: string = 'Принять'){
    const dialogRef = this.dialog.open<boolean>(WarningModalComponent, {
      data:{label: label, question: question, acceptButtonLabel: acceptButtonLabel}
    });

    return firstValueFrom(dialogRef.closed);
  }

  clickSelectCardButton(){
    this.clickedSelectCardButton.emit();
  }
}