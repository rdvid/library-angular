import { LivrosResultado } from './../models/interface';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs';
import { Item } from './../models/interface';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Fluxo do tap', retornoAPI)),
      map((resultado) => resultado.items),
      tap((resultado) => console.log('Fluxo após o map', resultado))
    );
  }
}
