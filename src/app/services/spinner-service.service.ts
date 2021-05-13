import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private currentSpinnerStateSubject = new BehaviorSubject<boolean>(false);
  currentSpinnerStateAction$ = this.currentSpinnerStateSubject.asObservable();

  displaySpinner(){
    this.currentSpinnerStateSubject.next(true);
  }
  hideSpinner(){
    this.currentSpinnerStateSubject.next(false);
  }

  constructor() { }
}
