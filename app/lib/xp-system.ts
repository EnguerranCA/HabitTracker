// ========== SYSTÈME XP ET NIVEAUX ==========

/**
 * Calcule le niveau basé sur l'XP total selon la formule : niveau n = n² × 100 XP
 * @param totalXp - XP total accumulé
 * @returns Le niveau actuel
 */
export function calculateLevel(totalXp: number): number {
  if (totalXp === 0) return 1;
  
  // Résoudre l'équation : totalXp = n² × 100
  // Donc : n = √(totalXp / 100)
  const level = Math.floor(Math.sqrt(totalXp / 100)) + 1;
  return Math.max(1, level);
}

/**
 * Calcule l'XP requis pour un niveau donné
 * @param level - Niveau cible
 * @returns XP total requis pour atteindre ce niveau
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return (level - 1) * (level - 1) * 100;
}

/**
 * Calcule l'XP requis pour passer au niveau suivant
 * @param currentLevel - Niveau actuel
 * @returns XP requis pour le prochain niveau
 */
export function getXpForNextLevel(currentLevel: number): number {
  return getXpForLevel(currentLevel + 1);
}

/**
 * Calcule l'XP actuel dans la progression vers le niveau suivant
 * @param totalXp - XP total
 * @param currentLevel - Niveau actuel
 * @returns XP accumulé depuis le début du niveau actuel
 */
export function getCurrentLevelXp(totalXp: number, currentLevel: number): number {
  const xpForCurrentLevel = getXpForLevel(currentLevel);
  return totalXp - xpForCurrentLevel;
}

/**
 * Calcule l'XP nécessaire pour le niveau en cours
 * @param currentLevel - Niveau actuel
 * @returns XP nécessaire pour compléter le niveau actuel
 */
export function getXpNeededForCurrentLevel(currentLevel: number): number {
  const xpForNext = getXpForNextLevel(currentLevel);
  const xpForCurrent = getXpForLevel(currentLevel);
  return xpForNext - xpForCurrent;
}

/**
 * Détermine le stade du hérisson basé sur le niveau
 * @param level - Niveau actuel
 * @returns Nom du stade et numéro (1-5)
 */
export function getHedgehogStage(level: number): { stage: string; stageNumber: number } {
  if (level <= 5) return { stage: "Bébé", stageNumber: 1 };
  if (level <= 10) return { stage: "Jeune", stageNumber: 2 };
  if (level <= 20) return { stage: "Adolescent", stageNumber: 3 };
  if (level <= 35) return { stage: "Adulte", stageNumber: 4 };
  return { stage: "Sage", stageNumber: 5 };
}

// ========== GAINS D'XP ==========

/**
 * XP de base pour accomplir une habitude
 */
export const BASE_HABIT_XP = 10;

/**
 * XP de base pour nourrir le hérisson
 */
export const BASE_FEED_XP = 5;

/**
 * Coût en glands pour nourrir le hérisson
 */
export const FEED_COST = 1;

/**
 * Calcule l'XP avec bonus de streak
 * @param baseXp - XP de base
 * @param streak - Nombre de jours de streak
 * @returns XP avec bonus appliqué
 */
export function calculateXpWithStreak(baseXp: number, streak: number): number {
  if (streak >= 7) {
    return Math.round(baseXp * 1.5); // Bonus ×1.5 à partir de 7 jours
  }
  return baseXp;
}

/**
 * Vérifie si l'utilisateur peut nourrir le hérisson
 * @param glandes - Nombre de glands disponibles
 * @returns true si possible
 */
export function canFeedHedgehog(glandes: number): boolean {
  return glandes >= FEED_COST;
}