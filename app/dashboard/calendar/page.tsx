import { Metadata } from 'next';
import HabitCalendar from '@/app/ui/habit-calendar';
import HabitTrackingChart from '@/app/ui/habit-tracking-chart';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Calendrier | Habit Tracker',
  description: 'Visualisez vos progrès sur un calendrier mensuel'
};

async function getHabitsCalendarData(userId: string) {
  try {
    // Récupérer toutes les habitudes actives de l'utilisateur
    const allHabits = await prisma.habit.findMany({
      where: {
        userId,
        // On peut ajouter une condition pour les habitudes actives si besoin
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        type: true,
        createdAt: true,
      }
    });

    // Récupérer les logs des 60 derniers jours
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 60);
    
    const logs = await prisma.habitLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate
        }
      },
      include: {
        habit: {
          select: {
            id: true,
            name: true,
            emoji: true,
            type: true
          }
        }
      }
    });

    // Organiser les données par date
    const calendarData: { [key: string]: { 
      completed: number; 
      missed: number; 
      total: number;
      habits: Array<{
        name: string;
        emoji: string;
        completed: boolean;
        type: 'GOOD' | 'BAD';
      }>;
    } } = {};
    
    // Pour chaque jour des 30 derniers jours
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      // Habitudes qui existaient ce jour-là
      const habitsForDay = allHabits.filter(habit => {
        const habitCreatedDate = new Date(habit.createdAt);
        return habitCreatedDate <= date;
      });

      // Logs pour ce jour
      const logsForDay = logs.filter(log => {
        const logDateKey = log.date.toISOString().split('T')[0];
        return logDateKey === dateKey;
      });

      // Créer un map des habitudes avec leur status
      const habitStatusMap = new Map();
      
      // D'abord, marquer toutes les habitudes comme non complétées
      habitsForDay.forEach(habit => {
        habitStatusMap.set(habit.id, {
          name: habit.name,
          emoji: habit.emoji,
          completed: false,
          type: habit.type as 'GOOD' | 'BAD'
        });
      });

      // Ensuite, mettre à jour avec les logs réels
      logsForDay.forEach(log => {
        habitStatusMap.set(log.habitId, {
          name: log.habit.name,
          emoji: log.habit.emoji,
          completed: log.completed,
          type: log.habit.type as 'GOOD' | 'BAD'
        });
      });

      const habits = Array.from(habitStatusMap.values());
      const completed = habits.filter(h => h.completed).length;
      const total = habits.length;
      const missed = total - completed;

      if (total > 0) { // Seulement ajouter si il y a des habitudes
        calendarData[dateKey] = {
          completed,
          missed,
          total,
          habits
        };
      }
    }

    return calendarData;
  } catch (error) {
    console.error('Erreur lors du chargement des données calendrier:', error);
    return {};
  }
}

async function getHabitsTrackingData(userId: string) {
  try {
    // Récupérer toutes les habitudes actives de l'utilisateur
    const allHabits = await prisma.habit.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
      }
    });

    // Récupérer les logs des 14 derniers jours
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    
    const logs = await prisma.habitLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Créer les données pour le graphique
    const trackingData = [];
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Habitudes qui existaient ce jour-là
      const habitsForDay = allHabits.filter(habit => {
        const habitCreatedDate = new Date(habit.createdAt);
        return habitCreatedDate <= date;
      });

      // Logs pour ce jour
      const logsForDay = logs.filter(log => {
        const logDateKey = log.date.toISOString().split('T')[0];
        return logDateKey === dateStr;
      });

      const totalHabits = habitsForDay.length;
      const completedHabits = logsForDay.filter(log => log.completed).length;
      const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

      trackingData.push({
        date: dateStr,
        totalHabits,
        completedHabits,
        completionRate
      });
    }

    // Si aucune habitude, créer des données de démonstration
    if (allHabits.length === 0) {
      const demoData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        demoData.push({
          date: dateStr,
          totalHabits: Math.floor(Math.random() * 5) + 3, // 3-7 habitudes
          completedHabits: Math.floor(Math.random() * 4) + 1, // 1-4 complétées
          completionRate: Math.floor(Math.random() * 40) + 40 // 40-80%
        });
      }
      return demoData;
    }

    return trackingData;
  } catch (error) {
    console.error('Erreur lors du chargement des données de tracking:', error);
    return [];
  }
}

export default async function CalendarPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  // Récupérer l'utilisateur complet depuis la base de données
  const dbUser = await prisma.user.findFirst({
    where: { 
      email: session.user.email! 
    }
  });

  if (!dbUser) {
    redirect('/login');
  }

  const habitsData = await getHabitsCalendarData(dbUser.id);
  const trackingData = await getHabitsTrackingData(dbUser.id);

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          📅 Calendrier des habitudes
        </h1>
        <p className="text-gray-600">
          Visualisez vos progrès jour par jour
        </p>
      </div>

      {/* Graphique d'évolution */}
      <HabitTrackingChart data={trackingData} />

      {/* Calendrier */}
      <HabitCalendar habitsData={habitsData} />
      
      {/* Stats rapides */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {Object.values(habitsData).reduce((sum, day) => sum + day.completed, 0)}
          </div>
          <div className="text-sm text-green-600">Habitudes réalisées</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700">
            {Object.values(habitsData).reduce((sum, day) => sum + day.missed, 0)}
          </div>
          <div className="text-sm text-red-600">Habitudes manquées</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">
            {Math.round(
              Object.values(habitsData).reduce((sum, day) => sum + (day.completed / day.total * 100 || 0), 0) / 
              Object.keys(habitsData).length || 0
            )}%
          </div>
          <div className="text-sm text-blue-600">Taux de réussite</div>
        </div>
      </div>
    </div>
  );
}