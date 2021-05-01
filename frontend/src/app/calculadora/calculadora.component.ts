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

  generoIac: string;

  resultadoImc:number;
  resultadoIac:number;

  tabelaImc:string;
  tabelaIac:string;

  iacReal:boolean = true;
  iacCompleto:boolean = true;

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
    console.log(altura, massa);
    this.resultadoImc = this.calculoImc(massa, altura);
    this.tabelaImc = this.checkImc(this.resultadoImc);
    this.calcularImc = true;
  }

  calculoImc(massa, altura): number {
    const imc = massa/(altura*altura);
    this.calcularImc = !this.calcularImc
    const total = parseFloat(imc.toFixed(1))
    return total;
  }

  checkImc(imc): string {
    if (imc < 18.5)
      return 'Magreza';
    if (imc >= 18.5 && imc < 25)
      return 'Ideal';
    if (imc >= 25 && imc < 30)
      return 'Sobrepeso';
    if (imc >= 30 && imc < 35)
      return 'Grau1';
    if (imc >= 35 && imc < 40)
      return 'Grau2';
    return 'Grau3';
  }

  resetarImc():void{
    this.formImc.reset();
    this.calcularImc = !this.calcularImc;
  }

  mostrarCalculoIac():void{
    if(this.formIac.invalid){
      this.iacCompleto = false;
      this.iacReal = true;
      return
    }
    const altura = this.maskAltura(this.formIac.value.alturaIac);
    const circunf = this.maskCircunf(this.formIac.value.circunfIac);
    this.resultadoIac = this.calculoIac(circunf, altura);
    this.generoIac = this.formIac.value.generoIac;
    this.tabelaIac = this.checkIac(this.resultadoIac, this.generoIac);
    if ((this.generoIac == 'h' && this.resultadoIac >= 8) || (this.generoIac == 'm' && this.resultadoIac >= 21))
      this.calcularIac = true;
    else{
      this.iacReal = false;
      this.iacCompleto = true;
    }
  }

  calculoIac(quadril, altura): number {
    const imc = (quadril/(altura*Math.sqrt(altura))) - 18;
    const total = parseFloat(imc.toFixed(1))
    return total;
  }

  checkIac(iac, genero): string{
    if (genero == 'h'){
      if (iac >= 8 && iac < 20)
        return 'Normal';
      if (iac >= 20 && iac < 25)
        return 'Sobrepeso';
      return 'Obesidade'
    }
    if (genero == 'm'){
      if (iac >= 21 && iac < 32)
        return 'Normal';
      if (iac >= 32 && iac < 38)
        return 'Sobrepeso';
      return 'Obesidade'
    }
  }

  resetarIac():void{
    this.calcularIac = true;
    this.iacCompleto = true;
    this.iacReal = true;
    this.formIac.reset();
    this.calcularIac = !this.calcularIac
  }

}
