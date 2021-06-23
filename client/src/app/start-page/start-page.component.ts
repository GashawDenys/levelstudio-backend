import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent{
  showSideMenu = false;
  safeURL;

  constructor(private _sanitizer: DomSanitizer){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/E0RqfYbDXiQ');
  }

  onMenuIconHover(){
    this.showSideMenu = !this.showSideMenu
  }
}
