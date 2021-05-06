import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent{
   opened: boolean = false;

   toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    AOS.init();
  }
}
