import {AfterViewChecked, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {LogInFormComponent} from "../log-in-form/log-in-form.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";
import {LogInFormData} from "../interfaces/LogInFormData";
import {SignUpFormData} from "../interfaces/SignUpFormData";
import {LoggingService} from "../services/logging-service";
import {MessageService} from "../services/message-service";
import {Subscription} from "rxjs";
import {MessageConst} from "../consts/MessageConst";
import {Token} from "@angular/compiler";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked, OnDestroy {
  @ViewChild('drawer') sideNav?: MatDrawer;
  email: string | undefined;
  password: string | undefined;
  isLogged: unknown = false;
  subscription: Subscription;

  toggleMaxWidth = 599;

  constructor(
    public dialog: MatDialog,
    private _loggingServiceModule: LoggingService,
    private _messageService: MessageService) {
    this.subscription = this.initSubscription();
  }

  ngAfterViewChecked(): void {
    if (window.innerWidth > this.toggleMaxWidth) {
      this.sideNav?.close();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    const dialogRef = this.dialog.open(LogInFormComponent, {
      panelClass: 'form-dialog'
    });

    const onClosed = dialogRef.componentInstance.submitEmitter.subscribe(async (data: LogInFormData) => {
      const result = await this._loggingServiceModule.login(data);
      this.isLogged = result;
    });
    dialogRef.afterClosed().subscribe(() => {
      onClosed.unsubscribe();
    });
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(SignUpFormComponent, {
      panelClass: 'form-dialog'
    });

    const onClosed = dialogRef.componentInstance.submitEmitter.subscribe((data: SignUpFormData) => {
      alert(JSON.stringify(data));
    });
    dialogRef.afterClosed().subscribe(() => {
      onClosed.unsubscribe();
    });
  }

  openLogoutForm() {
    this.isLogged = false;
  }

  initSubscription() {
    return this._messageService.getObservable().subscribe(message => {
      const keyHandlerPairs = this.getMessageKeyHandlerPairs();
      if(keyHandlerPairs.hasOwnProperty(message.key)){
        // @ts-ignore
        keyHandlerPairs[message.key](message.value);
      }
    });
  }

  getMessageKeyHandlerPairs() {
    const pairs = {};
    // @ts-ignore
    pairs[MessageConst.Token] = this.tokenMessageHandler;
    return pairs;
  }

  tokenMessageHandler(value: any) {

  }
}
