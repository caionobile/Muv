import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-img-catalogo',
  templateUrl: './img-catalogo.component.html',
  styleUrls: ['./img-catalogo.component.scss']
})
export class ImgCatalogoComponent implements OnInit {
     src;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
     this.src = data.caminho;
   }

  ngOnInit(): void {
  }

}
