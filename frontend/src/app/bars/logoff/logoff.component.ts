import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/pagina-inicial/auth/usuario.service';
@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.scss'],
})
export class LogoffComponent implements OnInit {
  constructor(private router: Router,private usuarioService:UsuarioService) {}

  ngOnInit(): void {}

  fazerLogoff(): void {
    //limpar session/token
    this.usuarioService.logout();
  }
}
