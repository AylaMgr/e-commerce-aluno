import { Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Não é golpe, confia!';
  private carrinhoService = inject(CarrinhoService);
  quantidadeHeader = this.carrinhoService.quantidadeItens;
}
