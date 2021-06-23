import {Component, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LogInFormComponent} from '../log-in-form/log-in-form.component';
import {SignUpFormComponent} from '../sign-up-form/sign-up-form.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  @ViewChild('drawer') sideNav: any;

  showSideMenu = false;
  safeURL;

  constructor(private _sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/E0RqfYbDXiQ');
  }

  onMenuIconHover() {
    this.showSideMenu = !this.showSideMenu
  }

  openLoginForm() {
    const dialogRef = this.dialog.open(LogInFormComponent, {
      width: '15vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Log in page closed');
      //this.sideNav.toggle();
    });
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(SignUpFormComponent, {
      width: '15vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Log in page closed');
      //this.sideNav.toggle();
    });
  }
}
