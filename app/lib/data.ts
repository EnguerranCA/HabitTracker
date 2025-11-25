import postgres from "postgres";
import { prisma } from "./prisma";
import {
  UsersTable,
  UserForm,
} from "./definitions";
import { getCurrentDateServer, createUTCDate } from "./debug-date-server";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredUsers(
  query: string,
  currentPage: number
) {
  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable[]>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.password
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
      ORDER BY users.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of users.");
  }
}

export async function fetchUserById(id: string) {
  try {
    const data = await sql<UserForm[]>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.password
      FROM users
      WHERE users.id = ${id};
    `;

    const user = data.map((user) => ({
      ...user,
    }));

    return user[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

// ========== FONCTIONS HABITUDES ==========

export async function fetchUserHabits(userId?: string) {
  try {
    // Si pas d'userId fourni, prendre le premier utilisateur disponible
    let targetUserId = userId;
    if (!targetUserId) {
      const firstUser = await prisma.user.findFirst();
      if (!firstUser) {
        return [];
      }
      targetUserId = firstUser.id;
    }

    // Créer une date UTC pour aujourd'hui (avec support debug)
    const today = getCurrentDateServer();
    const todayUTC = createUTCDate(today);

    // Requête optimisée avec limit
    const habits = await prisma.habit.findMany({
      where: {
        userId: targetUserId,
        isActive: true,
      },
      include: {
        logs: {
          where: {
            date: todayUTC,
          },
          take: 1,
          select: {
            completed: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Limiter à 20 habitudes max
    });

    // Enrichir les habitudes avec l'information de complétion du jour
    const habitsWithCompletionStatus = habits.map(habit => ({
      ...habit,
      isCompletedToday: habit.logs.length > 0 && habit.logs[0].completed,
    }));

    return habitsWithCompletionStatus;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user habits.");
  }
}

export async function fetchHabitLogsForToday(habitId: string) {
  try {
    // Créer une date UTC pour aujourd'hui sans problème de timezone
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

    const log = await prisma.habitLog.findFirst({
      where: {
        habitId,
        date: todayUTC,
      },
    });

    return log;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch habit log for today.");
  }
}

export async function fetchHabitById(id: string) {
  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id,
        isActive: true,
      },
    });

    return habit;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch habit.");
  }
}
