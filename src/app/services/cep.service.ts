import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${cep}/json/`);
  }
}
