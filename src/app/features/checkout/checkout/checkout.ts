import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { carrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  carrinhoService = inject(carrinhoService);

  formulario = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    endereco: new FormControl('')
  });

  finalizar(){
    console.log('Dados do Formulario: ', this.formulario.value);
    console.log('Dados do Carrinho: ', this.carrinhoService.itens());
  }
}
