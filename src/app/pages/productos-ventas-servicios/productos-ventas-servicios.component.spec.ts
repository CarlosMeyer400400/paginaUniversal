import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosVentasServiciosComponent } from './productos-ventas-servicios.component';

describe('ProductosVentasServiciosComponent', () => {
  let component: ProductosVentasServiciosComponent;
  let fixture: ComponentFixture<ProductosVentasServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosVentasServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosVentasServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
