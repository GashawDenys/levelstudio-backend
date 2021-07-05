import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {LogInFormComponent} from "../log-in-form/log-in-form.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";
import {LogInFormData} from "../interfaces/LogInFormData";
import {SignUpFormData} from "../interfaces/SignUpFormData";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked {
  @ViewChild('drawer') sideNav?: MatDrawer;
  email: string | undefined;
  password: string | undefined;

  toggleMaxWidth = 599;

  constructor(public dialog: MatDialog) {
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

    const onClosed = dialogRef.componentInstance.submitEmitter.subscribe((data: LogInFormData) => {
      alert(JSON.stringify(data));
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
}
