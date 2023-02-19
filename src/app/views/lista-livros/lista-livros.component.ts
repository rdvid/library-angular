import { Livro, VolumeInfo } from './../../models/interface';
import { Subscription, switchMap } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Item } from './../../models/interface';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  campoBusca: FormControl;
  subscription: Subscription;
  livro: Livro;
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap((valorDigitado) => this.service.buscar(valorDigitado))
  );
  constructor(private service: LivroService) {}

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items);
      },
      error: (erro) => console.error(erro.statusText),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
