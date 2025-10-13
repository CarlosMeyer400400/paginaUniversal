import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvService } from '../../../services/csv.service'; // Ajusta si la ruta es distinta

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrls: ['./acerca-de-nosotros.component.css'] // 👈 corregido (styleUrls con "s")
})
export class AcercaDeNosotrosComponent implements OnInit {

  quienesSomos: string = '';
  mision: string = '';
  vision: string = '';

  constructor(private csvService: CsvService) {}

  ngOnInit() {
    this.cargarDatosDesdeCSV();
  }

  cargarDatosDesdeCSV() {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        if (data.length > 0) {
          const item = data[0]; // 👈 simplificamos
          this.quienesSomos = item.QUIENES_SOMOS?.trim() || '';
          this.mision = item.MISION?.trim() || '';
          this.vision = item.VISION?.trim() || '';

          console.log('✅ Datos cargados desde CSV:', {
            quienesSomos: this.quienesSomos,
            mision: this.mision,
            vision: this.vision
          });
        } else {
          console.warn('⚠️ No se encontraron datos en el CSV');
        }
      },
      error: (err) => console.error('❌ Error al cargar CSV:', err)
    });
  }
}
