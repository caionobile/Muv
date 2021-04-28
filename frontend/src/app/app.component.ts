import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
   opened: boolean = false;

   toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    AOS.init();
  }
}

