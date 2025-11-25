/**
 * Utilitaires pour la gestion du mode debug temporel
 * Permet de simuler des dates différentes en développement
 */

const DEBUG_DATE_KEY = 'debug-date';

export function isDebugMode(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';
}

export function getDebugDate(): Date | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(DEBUG_DATE_KEY);
    return stored ? new Date(stored) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la date debug:', error);
    return null;
  }
}

export function setDebugDate(date: Date): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(DEBUG_DATE_KEY, date.toISOString());
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la date debug:', error);
  }
}

export function resetDebugDate(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(DEBUG_DATE_KEY);
  } catch (error) {
    console.error('Erreur lors du reset de la date debug:', error);
  }
}

export function getCurrentDate(): Date {
  if (!isDebugMode()) {
    return new Date();
  }
  
  const debugDate = getDebugDate();
  return debugDate || new Date();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

// Formatage pour l'affichage
export function formatDebugDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}