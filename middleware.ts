// Middleware d'authentification temporairement désactivé pour les tests
// (Base de données Vercel indisponible)

/*
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
*/

// Middleware désactivé - permet l'accès libre à toutes les pages
export function middleware() {
  // Pas de vérification d'authentification pour l'instant
  return;
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
};