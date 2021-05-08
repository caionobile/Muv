import { Component, Input } from '@angular/core';

@Component({
  selector: 'flip-card-front',
  template: `
  <div class="area-front">
    <h1>{{ nome }}</h1>
  </div>
  `,
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardFrontComponent {
  @Input('nome') nome: string;
}
