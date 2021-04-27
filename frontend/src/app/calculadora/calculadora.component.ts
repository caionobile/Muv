import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  formImc!: FormGroup;
  formIac!: FormGroup;
  calcularImc:boolean = false;
  calcularIac:boolean = false;

  resultadoImc:number = 0;
  resultadoIac:number = 0;

  maskAltura(h):number{
    h = parseFloat(h)
    if (h.toString().length == 2)
      return h/10
    if (h.toString().length == 3)
      return h/100
    return h
  }

  maskMassa(m):number{
    m = parseFloat(m)
    if (m.toString().length >= 3)
      return m/10
    return m
  }

  constructor() { }

  ngOnInit(): void {
    this.formImc = new FormGroup({
      alturaImc: new FormControl(null, {
        validators: [Validators.required],
      }),
      massaImc: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.formIac = new FormGroup({
      alturaIac: new FormControl(null, {

      }),

    });
  }

  teste():void{
    console.log(this.maskAltura(this.formImc.value.alturaImc))
    console.log(this.maskMassa(this.formImc.value.massaImc))
  }

  mostrarCalculoImc():void{
    if(this.formImc.invalid){
      return
    }
    const altura = this.maskAltura(this.formImc.value.alturaImc);
    const massa = this.maskMassa(this.formImc.value.massaImc);
    console.log(altura, massa)
    this.resultadoImc = this.calculoImc(massa, altura);
    this.calcularImc = true;
  }

  calculoImc(massa, altura): number {
    const imc = massa/(altura*altura);
    this.calcularImc = !this.calcularImc
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

  resetarImc():void{
    this.calcularImc = !this.calcularImc;
  }

  calculoIac(quadril, altura): number {
    this.calcularIac = !this.calcularIac
    const imc = (quadril/(altura*Math.sqrt(altura))) - 18;
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

  resetarIac():void{
    this.calcularIac = !this.calcularIac
  }

}
