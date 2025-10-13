import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // 👈 corregido: styleUrls con "s"
})
export class FooterComponent implements OnInit {

  logoUrl: string = '';
  nombre_empresa: string = '';
  telefono: string = '';
  direccion: string = '';
  facebook: string = '';
  instagram: string = '';
  eslogan: string = '';

  constructor(private csvService: CsvService) {}

  ngOnInit() {
    this.cargarDatosDesdeCSV();
  }

  cargarDatosDesdeCSV() {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        if (data.length > 0) {
          const item = data[0];
          this.logoUrl = item.LOGO_URL?.trim() || '';
          this.nombre_empresa = item.NOMBRE_EMPRESA?.trim() || '';
          this.telefono = item.TELEFONO?.trim() || '';
          this.direccion = item.DIRECCION?.trim() || '';
          this.facebook = item.FACEBOOK_URL?.trim() || '';
          this.instagram = item.INSTAGRAM_URL?.trim() || '';
          this.eslogan = item.ESLOGAN.trim() || '';

          console.log('✅ Datos cargados desde CSV:', {
            logoUrl: this.logoUrl,
            nombre_empresa: this.nombre_empresa,
            telefono: this.telefono,
            direccion: this.direccion,
            facebook: this.facebook,
            instagram: this.instagram,
            eslogan: this.eslogan
          });
        } else {
          console.warn('⚠️ No se encontraron datos en el CSV');
        }
      },
      error: (err) => console.error('❌ Error al cargar CSV:', err)
    });
  }

  openWhatsApp() {
    if (this.telefono) {
      const phone = this.telefono.replace(/\D/g, '');
      window.open(`https://wa.me/52${phone}`, '_blank');
    } else {
      console.warn('⚠️ No hay número de teléfono configurado en el CSV');
    }
  }
}
