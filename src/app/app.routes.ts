import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AcercaDeNosotrosComponent } from './pages/acerca-de-nosotros/acerca-de-nosotros.component';
import { ProductosVentasServiciosComponent } from './pages/productos-ventas-servicios/productos-ventas-servicios.component';
import { RedesSocialesComponent } from './pages/redes-sociales/redes-sociales.component';

export const routes: Routes = [
  { path: '', component: InicioComponent }, // 👈 Página de inicio
  { path: 'acerca-de-nosotros', component: AcercaDeNosotrosComponent },
  { path: 'productos-ventas-servicios', component: ProductosVentasServiciosComponent },
  { path: 'redes-sociales', component: RedesSocialesComponent },
  { path: '**', redirectTo: '' } // 👈 Redirige cualquier ruta no válida al inicio
];
