import { Component, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produto/produtos-service';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 //!signal
      error = signal<string | null>(null);
      produtos = signal<{nome: string; preco: number}[]>([]);
      carregando = signal(true);
//!Função para exibir produtos selecionados pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  //**=============== INJECT ======================

  private produtosService = inject (produtosService);


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

  this.carregarProdutos();
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

  carregarProdutos(){
    this.error.set(null);//!limpar o erro antes de iniciar a requisição
    this.carregando.set(true);//!ativar o sinal de carregamento antes de iniciar a requisição
    this.produtosService.buscarProdutos().subscribe({
      next:(dados) => {
        const produtos = this.produtosService.transFormarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('erro ao carregar produtos:', erro);
        this.error.set('Erro ao carregar produtos. Por favor, tente novamente!');
        this.carregando.set(false);
      }
    });
  }
}
