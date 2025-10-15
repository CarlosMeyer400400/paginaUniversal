import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CsvService } from '../../../services/csv.service';

@Component({
  selector: 'app-inicio',
 standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

    logoUrl: string = '';
    nombreEmpresa: string ='';
    eslogan: string= '';

 constructor(private csvService: CsvService) {}

  ngOnInit(): void {
    this.cargarLogoDesdeCSV();
  }
     private cargarLogoDesdeCSV(): void {
    this.csvService.obtenerDatos().subscribe({
      next: (data) => {
        if (data?.length > 0 && data[0].LOGO_URL ||
           data?.length > 0 && data[0].NOMBRE_EMPRESA||
           data?.length > 0 && data[0].ESLOGAN
           ) {
          this.logoUrl = data[0].LOGO_URL.trim();
          this.nombreEmpresa = data[0].NOMBRE_EMPRESA.trim();
          this.eslogan = data[0].ESLOGAN.trim();
          console.log('cargado:');
        } else {
          console.warn('⚠️ No se encontró el campo en el CSV');
        }
      },
      error: (err) => console.error('❌ Error al cargar CSV:', err)
    });
  
  }
}

