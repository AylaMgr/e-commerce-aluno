import {Injectable, signal, computed} from '@angular/core';

type ItemCarrinho ={
    nome: string;
    preco: number;
}

@Injectable({providedIn: 'root'})

export class CarrinhoService {
    //!estado global do carrinho
    private carrinho = signal<ItemCarrinho[]>([]);

    //? seleção de produtos do carrinho
    itens = computed(() =>
        this.carrinho());
    quantidadeItens = computed(() =>
        this.carrinho().length);
    totalItens = computed(() =>
        this.carrinho().reduce((total, item) =>total + item.preco, 0));
    carrinhoVazio = computed(() =>
        this.carrinho().length === 0);

    // TODO: ação de adicionar produto ao carrinho
    adicionar(produto: ItemCarrinho){
    this.carrinho.update( lista => [...lista, produto]);
}
    //TODO: ação de limpar o carrinho
    limpar(){
        this.carrinho.set([]);
}
}
