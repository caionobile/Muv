import { Component, OnInit } from '@angular/core';
import { ImgCatalogoComponent } from './img-catalogo/img-catalogo.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  catalogo = [
    ["Barra","assets/img/BarbellQR.jpg"],["Banco","assets/img/BenchQR.jpg"],
    ["Bicicleta","assets/img/BikeQR.jpg"],["Paralela","assets/img/ChinDipQR.jpg"],
    ["Haltere","assets/img/DumbbellQR.jpg"],["Pulley","assets/img/LatPullDownQR.jpg"],
    ["Esteira","assets/img/TreadMillQR.jpg"]

  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }



  abrirImagem(src): void {
      this.dialog.open(ImgCatalogoComponent, {
        data: {"caminho": src }
      });
    }

}
