import {Injectable, signal, computed} from '@angular/core';

@Injectable({providedIn: 'root'})

export class CarrinhoService {
    //!estado global do carrinho
    private carrinho = signal<{nome: string; preco: number}[]>([]);

    //? seleção de produtos do carrinho
    itens = computed(() =>
        this.carrinho());
    quantidadeItens = computed(() =>
        this.carrinho().length);
    totalItens = computed(() =>
        this.carrinho().reduce((total, item) =>total + item.preco, 0));

    // TODO: ação de adicionar produto ao carrinho
    adicionar(produto:{nome: string; preco: number}){
    this.carrinho.update( lista => [...lista, produto]);
}
    //TODO: ação de limpar o carrinho
    limpar(){
        this.carrinho.set([]);
}
}
