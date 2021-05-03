import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogConfig } from '../models/dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private currentDialogStateSubject = new BehaviorSubject<DialogConfig>({display: false, message: "", isSuccess: false,});
  currentDialogStateAction$ = this.currentDialogStateSubject.asObservable();

  displayDialog(config: DialogConfig){
    this.currentDialogStateSubject.next(config);
  }
  hideDialog(){
    this.currentDialogStateSubject.next({display: false, message: "", isSuccess: false});
  }

  constructor() { }

}
