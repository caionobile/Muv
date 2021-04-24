import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calculoImc(massa, altura): number {
    const imc = massa/(altura*altura);
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

  calculoIac(quadril, altura): number {
    const imc = (quadril/(altura*Math.sqrt(altura))) - 18;
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

}
