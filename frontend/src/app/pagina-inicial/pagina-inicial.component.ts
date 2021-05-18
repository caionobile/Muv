import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './auth/usuario.service';
import { CadastroComponent } from './cadastro/cadastro.component';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
s
  email: any;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.removerDadosCliente();
  }

  openCadastro() {
    this.dialog.open(CadastroComponent, {
      data: {email: this.email}
    });
  }

}
