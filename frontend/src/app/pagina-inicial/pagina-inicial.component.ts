import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  ) { }

  ngOnInit(): void {
  }

  openCadastro() {
    this.dialog.open(CadastroComponent, {
      data: {email: this.email}
    });
  }

}
