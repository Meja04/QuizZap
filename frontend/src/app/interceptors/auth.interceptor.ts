import { HttpInterceptorFn } from '@angular/common/http';

// Interceptor che aggiunge automaticamente il token JWT a tutte le richieste HTTP
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Se esiste un token, clona la richiesta e aggiunge l'header Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Inoltra la richiesta modificata al backend
    return next(clonedRequest);
  }
  // Se non c'è token, inoltra la richiesta originale senza modifiche
  return next(req);
};
