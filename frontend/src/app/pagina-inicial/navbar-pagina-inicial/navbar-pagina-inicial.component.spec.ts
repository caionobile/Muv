import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPaginaInicialComponent } from './navbar-pagina-inicial.component';

describe('NavbarPaginaInicialComponent', () => {
  let component: NavbarPaginaInicialComponent;
  let fixture: ComponentFixture<NavbarPaginaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPaginaInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPaginaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
