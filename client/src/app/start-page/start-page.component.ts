import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LogInFormComponent} from '../log-in-form/log-in-form.component';
import {SignUpFormComponent} from '../sign-up-form/sign-up-form.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDrawer} from '@angular/material/sidenav';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements AfterViewChecked {
  @ViewChild('drawer') sideNav?: MatDrawer;

  safeURL;
  toggleMaxWidth = 599;

  constructor(
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/E0RqfYbDXiQ');
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
