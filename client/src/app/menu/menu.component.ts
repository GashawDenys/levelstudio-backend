import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {LogInFormComponent} from "../log-in-form/log-in-form.component";
import {SignUpFormComponent} from "../sign-up-form/sign-up-form.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked {
  @ViewChild('drawer') sideNav?: MatDrawer;

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

    dialogRef.afterClosed().subscribe(result => {
      console.log('Log in page closed');
      //this.sideNav.toggle();
    });
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(SignUpFormComponent, {
      panelClass: 'form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Registration page closed');
      //this.sideNav.toggle();
    });
  }
}
