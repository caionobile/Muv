import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './auth/usuario.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {


  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm){
    if(form.invalid)return;
    this.usuarioService.login(form.value.email,form.value.password);
  }
  onSignup(form: NgForm){
    console.log(form.value)
    if(form.invalid)return;
    this.getDismissReason
    this.usuarioService.criarUsuario(form.value.nome, form.value.email,form.value.password);
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
