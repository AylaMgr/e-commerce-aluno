import {CanActivateFn, Router} from '@angular/router';
import {usuarioLogado} from './auth';
//condição para acessar a rota, se o usuário estiver logado, ele pode acessar a rota, caso contrário, ele será redirecionado para a página de login
export const authGuard: CanActivateFn = () => {
    return usuarioLogado();
};