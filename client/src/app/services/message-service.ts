import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Message } from '../interfaces/Message';

@Injectable()
export class MessageService {

  private subject = new Subject<Message>();

  send(message: Message) {
    this.subject.next(message);
  }

  clearMessages() {
    this.subject.next();
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}
