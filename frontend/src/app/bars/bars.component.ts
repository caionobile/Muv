import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as AOS from 'aos';
import { MatDialog } from '@angular/material/dialog';
import { PerfilComponent } from './perfil/perfil.component';
import { LogoffComponent } from './logoff/logoff.component';
import { ContatoComponent } from './contato/contato.component';
@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent {
  constructor(private modalService: NgbModal, public dialog: MatDialog) {}

  opened: boolean = false;
  closeResult: string;

  toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    AOS.init();
  }

  //MatDialogs
  abrirPerfil() {
    this.dialog.open(PerfilComponent, {
      width: '360px',
    });
  }

  abrirLogoff() {
    this.dialog.open(LogoffComponent);
  }

  abrirContato() {
    this.dialog.open(ContatoComponent,{
      width: '650px',
    });
  }

  //Abre o modal
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
