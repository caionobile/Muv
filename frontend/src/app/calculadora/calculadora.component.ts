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

  constructor() { }

  ngOnInit(): void {
    this.formImc = new FormGroup({
      alturaImc: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(9), Validators.pattern("^[0-9]*$")],
      }),

    });
    this.formIac = new FormGroup({
      alturaIac: new FormControl(null, {

      }),

    });
  }



/*   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  } */

  calculoImc(massa, altura): number {
    const imc = massa/(altura*altura);
    this.calcularImc = !this.calcularImc
    const total = parseFloat(imc.toFixed(2))
    return total;
  }

  resetarImc():void{
    this.calcularImc = !this.calcularImc
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
