import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { UsuarioService } from './pagina-inicial/auth/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
   opened: boolean = false;


   constructor( private usuarioService: UsuarioService){}
   
   toggleSidebar() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.usuarioService.autenticarAutomaticamente();
    AOS.init();
  }
}

