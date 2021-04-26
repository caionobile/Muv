import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheExercicioComponent } from './detalhe-exercicio.component';

describe('DetalheExercicioComponent', () => {
  let component: DetalheExercicioComponent;
  let fixture: ComponentFixture<DetalheExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheExercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
