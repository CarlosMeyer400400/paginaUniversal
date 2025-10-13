import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable, map } from 'rxjs';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any[]> {
    return this.http.get(environment.csvUrl, { responseType: 'text' }).pipe(
      map((data) => {
        const parsed = Papa.parse(data, { header: true, skipEmptyLines: true });
        return parsed.data;
      })
    );
  }
}
