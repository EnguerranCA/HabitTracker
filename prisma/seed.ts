import { PrismaClient, HabitType, Frequency, SessionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed Habit\'Hisson...');

  // Créer des utilisateurs de test
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'test@habithisson.com' },
    update: {},
    create: {
      email: 'test@habithisson.com',
      name: 'Testeur Hérisson',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alice@habithisson.com' },
    update: {},
    create: {
      email: 'alice@habithisson.com', 
      name: 'Alice Martin',
      password: hashedPassword,
    },
  });

  console.log('👤 Utilisateurs créés:', { user1: user1.name, user2: user2.name });

  // Créer la progression utilisateur
  const userProgress1 = await prisma.userProgress.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      level: 3,
      xp: 450,
      totalXp: 450,
      hedgehogSize: 3,
      hedgehogMood: 'happy',
      totalHabitsCompleted: 45,
      currentStreak: 7,
      longestStreak: 12,
      unlockedDecorations: JSON.stringify(['tree', 'flowers', 'mushroom']),
    },
  });

  const userProgress2 = await prisma.userProgress.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      level: 1,
      xp: 80,
      totalXp: 80,
      hedgehogSize: 1,
      hedgehogMood: 'happy',
      totalHabitsCompleted: 8,
      currentStreak: 3,
      longestStreak: 5,
      unlockedDecorations: JSON.stringify([]),
    },
  });

  console.log('📊 Progression créée pour les utilisateurs');

  // Créer des habitudes de test pour user1
  const habits = [
    {
      name: 'Méditation matinale',
      emoji: '🧘',
      description: '10 minutes de méditation chaque matin',
      type: HabitType.GOOD,
      frequency: Frequency.DAILY,
      targetCount: 1,
    },
    {
      name: 'Lire 30 pages',
      emoji: '📚',
      description: 'Lire au moins 30 pages d\'un livre',
      type: HabitType.GOOD,
      frequency: Frequency.DAILY,
      targetCount: 30,
    },
    {
      name: 'Exercice physique',
      emoji: '🏃',
      description: 'Faire du sport ou de l\'exercice',
      type: HabitType.GOOD,
      frequency: Frequency.DAILY,
      targetCount: 1,
    },
    {
      name: 'Éviter les réseaux sociaux',
      emoji: '📱',
      description: 'Ne pas utiliser les réseaux sociaux',
      type: HabitType.BAD,
      frequency: Frequency.DAILY,
      targetCount: 0,
    },
    {
      name: 'Cours de français',
      emoji: '🇫🇷',
      description: 'Pratiquer le français 2 fois par semaine',
      type: HabitType.GOOD,
      frequency: Frequency.WEEKLY,
      targetCount: 2,
    },
  ];

  const createdHabits = [];
  for (const habit of habits) {
    const createdHabit = await prisma.habit.create({
      data: {
        ...habit,
        userId: user1.id,
      },
    });
    createdHabits.push(createdHabit);
  }

  console.log('✅ Habitudes créées:', createdHabits.map(h => h.name));

  // Créer quelques habitudes pour user2
  const habitsUser2 = [
    {
      name: 'Boire 2L d\'eau',
      emoji: '💧',
      type: HabitType.GOOD,
      frequency: Frequency.DAILY,
      targetCount: 8, // 8 verres
    },
    {
      name: 'Ranger ma chambre',
      emoji: '🧹',
      type: HabitType.GOOD,
      frequency: Frequency.WEEKLY,
      targetCount: 1,
    },
  ];

  for (const habit of habitsUser2) {
    await prisma.habit.create({
      data: {
        ...habit,
        userId: user2.id,
      },
    });
  }

  // Créer des logs d\'habitudes pour simuler un historique
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Simuler 7 jours d\'historique pour les habitudes de user1
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
    
    for (const habit of createdHabits) {
      // Simuler des réussites aléatoires (70% de chance de réussite)
      const completed = Math.random() > 0.3;
      const count = completed ? habit.targetCount : Math.floor(Math.random() * habit.targetCount);
      
      await prisma.habitLog.create({
        data: {
          habitId: habit.id,
          userId: user1.id,
          date: date,
          completed: completed,
          count: count,
        },
      });
    }
  }

  console.log('📅 Logs d\'habitudes créés pour les 7 derniers jours');

  // Créer quelques sessions de focus
  const focusSessions = [
    {
      userId: user1.id,
      duration: 25,
      completed: true,
      xpEarned: 50,
      sessionType: SessionType.POMODORO,
      completedAt: new Date(),
    },
    {
      userId: user1.id,
      duration: 90,
      completed: true,
      xpEarned: 200,
      sessionType: SessionType.DEEP_WORK,
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2 heures
    },
  ];

  for (const session of focusSessions) {
    await prisma.focusSession.create({ data: session });
  }

  console.log('🎯 Sessions de focus créées');

  // Créer des achievements
  const achievements = [
    {
      name: 'Premier pas',
      description: 'Compléter votre première habitude',
      emoji: '🎉',
      xpReward: 50,
      requirements: JSON.stringify({ type: 'first_habit', count: 1 }),
    },
    {
      name: 'Série de 7',
      description: 'Maintenir une série de 7 jours',
      emoji: '🔥',
      xpReward: 200,
      requirements: JSON.stringify({ type: 'streak', count: 7 }),
    },
    {
      name: 'Centurion',
      description: 'Compléter 100 habitudes au total',
      emoji: '💯',
      xpReward: 500,
      requirements: JSON.stringify({ type: 'total_habits', count: 100 }),
    },
    {
      name: 'Maître du focus',
      description: 'Compléter 10 sessions de focus',
      emoji: '🧠',
      xpReward: 300,
      requirements: JSON.stringify({ type: 'focus_sessions', count: 10 }),
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }

  console.log('🏆 Achievements créés');

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