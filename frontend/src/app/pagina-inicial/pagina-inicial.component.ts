import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './auth/usuario.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {

  email: any;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.usuarioService.autenticarAutomaticamente()){
      this.router.navigate(['/muv'])
    }else{ this.usuarioService.removerDadosCliente()}
  }

  openCadastro() {
    this.dialog.open(CadastroComponent, {
      data: {email: this.email}
    });
  }

}
