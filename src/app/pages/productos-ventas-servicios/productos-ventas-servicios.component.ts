import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-productos-ventas-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-ventas-servicios.component.html',
  styleUrl: './productos-ventas-servicios.component.css'
})
export class ProductosVentasServiciosComponent implements OnInit {
  productos: any[] = [];
  carrito: any[] = [];
  productoSeleccionado: any = null;
  mostrarPanelCarrito = false;
  telefonoWhatsApp: string = '';

  // Paginación
  paginaActual: number = 0;
  productosPorPagina: number = 10;

  constructor(private csvService: CsvService) {}

  ngOnInit() {
    this.cargarDatosDesdeCSV();
  }

  cargarDatosDesdeCSV() {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        this.productos = data.map((item: any) => ({
          NOMBRE: item.NOMBRE?.trim() || '',
          DESCRIPCION: item.DESCRIPCION?.trim() || '',
          PRECIO: parseFloat(item.PRECIO?.trim() || '0'),
          IMAGEN_URL: item.IMAGEN_URL?.trim() || '',
          TELEFONO: item.TELEFONO?.trim() || '',
          DISPONIBLES: parseInt(item.DISPONIBLES?.trim() || '0', 10)
        }));

        if (this.productos.length > 0) {
          this.telefonoWhatsApp = this.productos[0].TELEFONO;
        }
      },
      error: (err) => console.error('❌ Error al cargar CSV:', err)
    });
  }

  // --- Carrito ---
  agregarAlCarrito(producto: any) {
    let itemCarrito = this.carrito.find(p => p.NOMBRE === producto.NOMBRE);
    if (itemCarrito) {
      if (itemCarrito.cantidad < producto.DISPONIBLES) {
        itemCarrito.cantidad++;
      } else {
        alert(`⚠️ No puedes agregar más de ${producto.DISPONIBLES} unidades de "${producto.NOMBRE}"`);
      }
    } else {
      this.carrito.push({...producto, cantidad: 1});
    }
  }

  aumentarCantidad(producto: any) {
    if (producto.cantidad < producto.DISPONIBLES) {
      producto.cantidad++;
    }
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  eliminarProducto(producto: any) {
    this.carrito = this.carrito.filter(p => p.NOMBRE !== producto.NOMBRE);
  }

  getTotalCompra(): number {
    return this.carrito.reduce((total, p) => total + p.PRECIO * p.cantidad, 0);
  }

  getCantidadTotal(): number {
    return this.carrito.reduce((total, p) => total + p.cantidad, 0);
  }

  // --- Modal ---
  abrirDetalle(producto: any) {
    this.productoSeleccionado = producto;
  }

  cerrarDetalle() {
    this.productoSeleccionado = null;
  }

  // --- WhatsApp ---
  continuarCompra() {
    if (this.carrito.length === 0) return;

    const lista = this.carrito
      .map(p => `🛒 ${p.NOMBRE} x${p.cantidad} - $${p.PRECIO}`)
      .join('%0A');

    const total = this.getTotalCompra();

    const mensaje = `Hola! Me gustaría continuar con la compra de:%0A${lista}%0A%0ATotal: $${total}`;
    const telefono = this.telefonoWhatsApp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, '_blank');
  }

  // --- Paginación ---
  getProductosPagina() {
    const start = this.paginaActual * this.productosPorPagina;
    return this.productos.slice(start, start + this.productosPorPagina);
  }

  getTotalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  siguientePagina() {
    if ((this.paginaActual + 1) * this.productosPorPagina < this.productos.length) {
      this.paginaActual++;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 🆕 Scroll arriba
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 🆕 Scroll arriba
    }
  }
}
