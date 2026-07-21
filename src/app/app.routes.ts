import { Routes } from '@angular/router';
import {ListaProdutos} from './features/produtos/lista-produtos/lista-produtos';
import { Carrinho } from './feactures/carrinho/carrinho/carrinho';

export const routes: Routes = [
    {
path:'',
component: ListaProdutos,
},
{path:'carrinho',
    component: Carrinho},
];
