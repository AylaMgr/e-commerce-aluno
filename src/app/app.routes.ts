import {Routes} from '@angular/router';
import {authGuard} from './core/auth.guard';
import { adminGuard } from './core/admin.guard';
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
            import('./features/carrinho/carrinho/carrinho')
        .then((m) => m.Carrinho),
    },
    {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/checkout/checkout/checkout').then((m) => m.Checkout),
    },
    {
        path:'login',
        loadComponent:() => import('./features/login/login/login').then((m) => m.Login),
    },
    {
        path: 'acesso-negado',
        loadComponent: () =>
            import('./features/acesso-negado/acesso-negado/acesso-negado').then((m) => m.AcessoNegado),
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () =>
            import('./features/admin/admin/admin').then((m) => m.Admin),
    },
    {
        path: '**',
        redirectTo: '', //caso o usuário digite uma rota que não existe, ele será redirecionado para a raiz
    },
];