import {AfterViewChecked, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {LogInFormComponent} from "../log-in-form/log-in-form.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";
import {LogInFormData} from "../interfaces/LogInFormData";
import {SignUpFormData} from "../interfaces/SignUpFormData";
import {LoggingService} from "../services/logging-service";
import {MessageKey} from "../consts/MessageKey";
import {IMessageReceiver, Message, MessageReceiver} from "../interfaces/Message";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked {
  @ViewChild('drawer') sideNav?: MatDrawer;
  toggleMaxWidth = 599;
  email: string | undefined;
  password: string | undefined;
  localStorage: any = localStorage;

  constructor(
    public dialog: MatDialog,
    private _loggingServiceModule: LoggingService,
    public messageReceiver: MessageReceiver) {
    this.createMessageKeyHandlerPairs();
  }

  ngAfterViewChecked(): void {
    if (window.innerWidth > this.toggleMaxWidth) {
      this.sideNav?.close();
    }
  }

  openLoginForm() {
    const dialogRef = this.dialog.open(LogInFormComponent, {
      panelClass: 'form-dialog'
    });

    const onClosed = dialogRef.componentInstance.submitEmitter.subscribe(async (data: LogInFormData) => {
      this._loggingServiceModule.logIn(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      onClosed.unsubscribe();
    });
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(SignUpFormComponent, {
      panelClass: 'form-dialog'
    });

    const onClosed = dialogRef.componentInstance.submitEmitter.subscribe(async (data: SignUpFormData) => {
      this._loggingServiceModule.signUp(data);
    });
    dialogRef.afterClosed().subscribe(() => {
      onClosed.unsubscribe();
    });
  }

  openLogoutForm() {
    this._loggingServiceModule.logOut();
  }

  createMessageKeyHandlerPairs() {
    this.messageReceiver.addKeyHandlerPairs(this.getMessageKeyHandlerPairs());
  }

  getMessageKeyHandlerPairs(): { [index: number]: Function }{
    const pairs: { [index: number]: Function } = {};
    pairs[MessageKey.Token] = this.tokenMessageHandler;
    return pairs;
  }

  tokenMessageHandler(value: any) {
    console.log(value);
  }
}
