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
    // Récupérer les logs des 60 derniers jours pour avoir assez de données
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
            name: true,
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
    
    // Grouper par date
    const logsByDate = logs.reduce((acc, log) => {
      const dateKey = log.date.toISOString().split('T')[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(log);
      return acc;
    }, {} as { [key: string]: typeof logs });

    // Calculer les statistiques par jour
    Object.entries(logsByDate).forEach(([date, dayLogs]) => {
      const completed = dayLogs.filter(log => log.completed).length;
      const total = dayLogs.length;
      const missed = total - completed;

      const habits = dayLogs.map(log => ({
        name: log.habit.name,
        emoji: '⭐', // TODO: récupérer le vrai emoji depuis la base
        completed: log.completed,
        type: log.habit.type as 'GOOD' | 'BAD'
      }));

      calendarData[date] = {
        completed,
        missed,
        total,
        habits
      };
    });

    return calendarData;
  } catch (error) {
    console.error('Erreur lors du chargement des données calendrier:', error);
    return {};
  }
}

async function getHabitsTrackingData(userId: string) {
  try {
    // Récupérer les logs des 30 derniers jours
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
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

    // Grouper par date et calculer les statistiques
    const logsByDate = logs.reduce((acc, log) => {
      const dateKey = log.date.toISOString().split('T')[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(log);
      return acc;
    }, {} as { [key: string]: typeof logs });

    // Créer les données pour le graphique
    const trackingData = Object.entries(logsByDate).map(([date, dayLogs]) => {
      const totalHabits = dayLogs.length;
      const completedHabits = dayLogs.filter(log => log.completed).length;
      const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

      return {
        date,
        totalHabits,
        completedHabits,
        completionRate
      };
    });

    // Si aucune donnée, créer des données de démonstration pour les 7 derniers jours
    if (trackingData.length === 0) {
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
    <main className="p-4 space-y-6">
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
    </main>
  );
}