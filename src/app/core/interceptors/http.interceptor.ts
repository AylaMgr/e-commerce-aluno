import {HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    
    console.log('REQUEST', req.url);
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.obterToken();
    const novareq = token ?
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        }): req;
return next(novareq).pipe (
    tap({
        next: (event) => console.log('Respone ', event),
        error: (error) => console.log('Erro na requisição ', error),
    }),
    catchError((error) => {
        console.error('Erro na requisição ', error);
        return throwError(() => error);
    }),
    catchError((error) => {
        if(error.status ===401) {
            console.error('Erro de autenticação de Usuario', error);
            authService.logout();
            router.navigateByUrl('/login');
        }
        if (error.status === 500) {
            console.warn('Erro interno do servidor!', error);
        }
        if(error.status === 403){
            console.warn('Acesso Proibido, Usuario sem Autorização'),
            router.navigateByUrl('/produtos');
        }
        return throwError(() => error);
    }),
);
};