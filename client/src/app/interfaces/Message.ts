import {MessageService} from "../services/message-service";
import {Subscription} from "rxjs";
import {Injectable, OnDestroy} from '@angular/core';
import {MessageKey} from "../consts/MessageKey";

export interface Message {
  key: number,
  value: any
}

export interface IMessageSender {
  messageSender: MessageSender;
}

@Injectable()
export class MessageSender {

  constructor(
    private _messageService: MessageService
  ) {
  }

  send(key: MessageKey, value: any) {
    this._messageService.send({key, value});
  }

  clearMessages() {
    this._messageService.clearMessages();
  }
}

export interface IMessageReceiver {

  createMessageKeyHandlerPairs(): void;
  getMessageKeyHandlerPairs(): { [index: number]: Function };
  messageReceiver: MessageReceiver;
}

@Injectable()
export class MessageReceiver implements OnDestroy {
  subscription: Subscription;
  keyHandlerPairs: { [key: number]: typeof Function } = {};

  constructor(
    private _messageService: MessageService
  ) {
    this.subscription = this.initSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addKeyHandlerPair(key: MessageKey, handler: Function) {
    if (this.keyHandlerPairs[key]) {
      return false;
    }
    this.keyHandlerPairs[key] = handler;
    return true
  }

  addKeyHandlerPairs(pairs: { [index: number]: Function }) {
    for (const key in pairs) {
      this.addKeyHandlerPair(parseInt(key), pairs[key]);
    }
  }

  removeKeyHandlerPair(key: MessageKey) {
    delete this.keyHandlerPairs[key];
  }

  removeKeyHandlerPairs(keys: Array<MessageKey>) {
    for (const key of keys) {
      this.removeKeyHandlerPair(key);
    }
  }

  reassignKeyHandlerPair(key: MessageKey, handler: typeof Function) {
    this.removeKeyHandlerPair(key);
    this.addKeyHandlerPair(key, handler);
  }

  reassignKeyHandlerPairs(pairs: { [index: number]: Function }) {
    for (const key in pairs) {
      this.reassignKeyHandlerPair(parseInt(key), pairs[key]);
    }
  }

  private initSubscription(): Subscription {
    return this._messageService.getObservable().subscribe(message => {
      if (this.keyHandlerPairs.hasOwnProperty(message.key)) {
        // @ts-ignore
        this.keyHandlerPairs[message.key](message.value);
      }
    });
  }
}
