import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-redes-sociales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redes-sociales.component.html',
  styleUrl: './redes-sociales.component.css'
})
export class RedesSocialesComponent  implements OnInit {
  telefono: string = '';
  direccion: string = '';
  facebook: string = '';
  instagram: string = '';

   constructor(private csvService: CsvService) {}

  ngOnInit() {
    this.cargarDatosDesdeCSV();
  }

    cargarDatosDesdeCSV() {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        if (data.length > 0) {
          const item = data[0];
          this.telefono = item.TELEFONO?.trim() || '';
          this.direccion = item.DIRECCION?.trim() || '';
          this.facebook = item.FACEBOOK_URL?.trim() || '';
          this.instagram = item.INSTAGRAM_URL?.trim() || '';

          console.log('✅ Datos cargados desde CSV:', {
            telefono: this.telefono,
            direccion: this.direccion,
            facebook: this.facebook,
            instagram: this.instagram
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
