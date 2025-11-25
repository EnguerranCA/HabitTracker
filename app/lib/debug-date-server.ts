/**
 * Utilitaires pour la gestion du mode debug temporel côté serveur
 * Pour l'instant, retourne simplement la date réelle
 * TODO: Implémenter la synchronisation client-serveur
 */

export function isDebugMode(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.DEBUG_MODE === 'true';
}

export function getCurrentDateServer(): Date {
  // Pour l'instant, on utilise toujours la date réelle côté serveur
  // Le debug sera géré principalement côté client
  return new Date();
}

export function createUTCDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}