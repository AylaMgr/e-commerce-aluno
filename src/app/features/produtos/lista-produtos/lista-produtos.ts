import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 //!Lista com dados - Array
  produtos = signal([
    { 
      nome: 'Teclado Gamer', 
      preco:149.00
    },
    {
      nome: 'Mouse Gamer', 
      preco:299.99
    },
    {
      nome: 'Monitor Gamer', 
      preco:1599.99
    },
    {
      nome: 'Desktop Gamer', 
      preco:4999.99
    },
    {
      nome: 'Headset Gamer', 
      preco:699.99
    }
  ]);
//!Função para exibir produtos selecionados pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  //! função que adicionar produto usando metodo update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [...listaAtual, 
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!função que contabiliza a quantidade de produtos na lista com metodo computed()
  totalProdutos = computed(() => this.produtos().length);
  //!função que calcula o valor total do produtos usando metodo computed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
  //!função para substituir a lista atual usando o metodo set()
  substituirProdutos(){
    this.produtos.set([
      { nome:'Teclado', preco: 50 },
      { nome:'Mouse', preco: 15 },
      { nome:'Monitor', preco: 500 },
      { nome:'Desktop', preco: 1500 },
      { nome:'headset', preco: 30 },
    ]);
  }
//! metodo para monitorar alterações em tempo real usando effect() 
constructor(){
  effect(() => {
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() => {
    console.log('Valor Total Atualizado: ', this.valorTotal());
  });
  effect(() => {
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalProdutos()}) - Loja do Matheus`;
    }
  });
}
//! Metodo para criar um estado de seleção com signal string | null
produtoSelecionado = signal <string | null>(null);
//! Metodo para criar um estado de carrinho com signal
carrinho = signal <{nome: string, preco: number}[]>([]);

adicionarAoCarrinho(produto: { nome: string, preco: number }){
  this.carrinho.update(listaAtual => [...listaAtual, produto]);
}
//!metodo para calcular a quantidade total de itens no carrinho usando computed()
quantidadeCarrinho = computed(() => this.carrinho().length);
//!metodo para calcular o valor total dos itens no carrinho usando computed()
totalCarrinho = computed(() => {
  return this.carrinho().reduce((total, item) => total + item.preco, 0)});
}
