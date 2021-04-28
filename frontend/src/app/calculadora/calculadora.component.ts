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

  generoIac: number;

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

  maskCircunf(c):number{
    return parseFloat(c)
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
        validators: [Validators.required],
      }),
      circunfIac: new FormControl(null, {
        validators: [Validators.required],
      }),
      generoIac:new FormControl(null, {
        validators: [Validators.required],
      }),
    });
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
    this.formImc.reset(); //Mudar caso ache algo melhor
    this.calcularImc = !this.calcularImc;
  }

  mostrarCalculoIac():void{
    if(this.formIac.invalid){
      return
    }
    const altura = this.maskAltura(this.formIac.value.alturaIac);
    const circunf = this.maskCircunf(this.formIac.value.circunfIac);
    this.resultadoIac = this.calculoIac(circunf, altura);
    this.generoIac = this.formIac.value.generoIac;
    this.calcularIac = true;
  }

  calculoIac(quadril, altura): number {
    this.calcularIac = !this.calcularIac
    const imc = (quadril/(altura*Math.sqrt(altura))) - 18;
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

  resetarIac():void{
    this.formIac.reset();
    this.calcularIac = !this.calcularIac
  }

}
