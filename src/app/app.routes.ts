import {Routes} from '@angular/router';
import {authGuard} from './core/auth.guard';
//criando as rotas do projeto, para cada rota, será carregado um componente diferente, e cada componente será carregado de forma assíncrona, ou seja, somente quando o usuário acessar a rota correspondente.
export const routes: Routes = [
    {
        path: '', //para raiz localhost:4200
        loadComponent: () =>
            import('./features/home/home/home')
        .then((m) => m.Home),
    },
    {
        path: 'produtos',
        loadComponent: () =>
            import('./features/produtos/lista-produtos/lista-produtos')
        .then((m) => m.ListaProdutos),
    },
    {
        path: 'carrinho',
        canActivate: [authGuard], //para acessar a rota do carrinho, o usuário precisa estar logado, caso contrário, ele será redirecionado para a página de login
        loadComponent: () =>
            import('./feactures/carrinho/carrinho/carrinho')
        .then((m) => m.Carrinho),
    },
    {
        path: '**',
        redirectTo: '', //caso o usuário digite uma rota que não existe, ele será redirecionado para a raiz
    },
];