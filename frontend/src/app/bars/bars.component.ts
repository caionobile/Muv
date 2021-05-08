import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent{

  constructor(
    private modalService: NgbModal,
  ){}

   opened: boolean = false;
   closeResult: string;

   toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    AOS.init();
  }

    //Abre o modal
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    //Fecha o modal
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

}
