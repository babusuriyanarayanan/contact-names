import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  constructor() { }

  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();



  changeMessage(message) {
    this.messageSource.next(message)
  }

}
