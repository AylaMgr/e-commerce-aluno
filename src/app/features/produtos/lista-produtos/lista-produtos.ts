import { Component, signal, computed, effect, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produto/produtos-service';


@Component({
  selector: 'app-lista-produtos',
  imports : [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 //!=================signal==========================
      
      error = signal<string | null>(null);
      produtos = signal<{nome: string; preco: number}[]>([]);
      carregando = signal(true);
      produtoSelecionado = signal <string | null>(null);
      carrinho = signal <{nome: string, preco: number}[]>([]);

//!Função para exibir produtos selecionados pelo usuario no console
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  //!=============== INJECT ======================

  private produtosService = inject (produtosService);


  //! função que adicionar produto usando metodo update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [...listaAtual, 
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!================== computed =========================
  totalProdutos = computed(() => this.produtos().length);
  
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
  
  quantidadeCarrinho = computed(() => this.carrinho().length);
  
  totalCarrinho = computed(() => {
  return this.carrinho().reduce((total, item) => total + item.preco, 0)});

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
//! ================= EFFECT ========================= 
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
adicionarAoCarrinho(produto: { nome: string, preco: number }){
  this.carrinho.update(listaAtual => [...listaAtual, produto]);
}
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
