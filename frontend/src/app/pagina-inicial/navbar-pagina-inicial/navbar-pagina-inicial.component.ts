import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-navbar-pagina-inicial',
  templateUrl: './navbar-pagina-inicial.component.html',
  styleUrls: ['./navbar-pagina-inicial.component.scss']
})
export class NavbarPaginaInicialComponent implements OnInit {


  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  openCadastro() {
    this.dialog.open(CadastroComponent, {
      data: {email: ""}
    });
  }

}
