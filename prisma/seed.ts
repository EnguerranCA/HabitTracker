import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed Habit\'Hisson...');

  // Créer un utilisateur de test simple
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@mail.fr' },
    update: {},
    create: {
      email: 'test@mail.fr',
      name: 'Utilisateur Test',
      password: hashedPassword,
    },
  });

  console.log('👤 Utilisateur créé:', { name: user.name, email: user.email });

  // Créer la progression utilisateur de base
  await prisma.userProgress.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      level: 1,
      xp: 0,
      totalXp: 0,
      hedgehogSize: 1,
      hedgehogMood: 'neutral',
      totalHabitsCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      unlockedDecorations: JSON.stringify([]),
    },
  });

  console.log('📊 Progression utilisateur initialisée');

  console.log('✨ Seed terminé avec succès ! 🦔');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });