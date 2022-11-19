import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCatalogoComponent } from './img-catalogo.component';

describe('ImgCatalogoComponent', () => {
  let component: ImgCatalogoComponent;
  let fixture: ComponentFixture<ImgCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
