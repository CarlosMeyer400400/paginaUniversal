import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoUrl: string = '';
  isMenuOpen: boolean = false;

  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.cargarLogoDesdeCSV();
  }

  /** Alterna el menú móvil */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Cierra el menú al hacer clic en un enlace */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /** Carga la URL del logo desde el archivo CSV */
  private cargarLogoDesdeCSV(): void {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        if (data?.length > 0 && data[0].LOGO_URL) {
          this.logoUrl = data[0].LOGO_URL.trim();
          console.log('✅ Logo URL cargado:', this.logoUrl);
        } else {
          console.warn('⚠️ No se encontró el campo LOGO_URL en el CSV');
        }
      },
      error: (err) => console.error('❌ Error al cargar CSV:', err)
    });
  }
}
