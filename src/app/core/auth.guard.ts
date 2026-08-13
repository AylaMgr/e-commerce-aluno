import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
//condição para acessar a rota, se o usuário estiver logado, ele pode acessar a rota, caso contrário, ele será redirecionado para a página de login
export const authGuard: CanActivateFn = () => {
    const authService = inject (AuthService);
    const router = inject (Router)
if(authService.usuarioLogado()){
    return true;
}
return router.createUrlTree(['/login']);
};