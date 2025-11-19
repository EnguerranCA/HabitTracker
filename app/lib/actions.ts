"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    emoji?: string[];
    frequency?: string[];
    type?: string[];
  };
  message: string;
  success?: boolean;
};

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  email: z.string({
    invalid_type_error: "Please enter a valid email.",
  }),
  password: z.string({
    invalid_type_error: "Please enter a password.",
  }),
});

const CreateUser = UserFormSchema.omit({ id: true });
const UpdateUser = UserFormSchema.omit({ id: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${hashedPassword}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update User." };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath("/dashboard/users");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to Delete User.");
  }
}

// ========== ACTIONS POUR LES HABITUDES ==========

const HabitFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Veuillez entrer un nom d'habitude.",
  }).min(1, "Le nom de l'habitude est requis.").max(50, "Le nom ne peut pas dépasser 50 caractères."),
  emoji: z.string({
    invalid_type_error: "Veuillez sélectionner un emoji.",
  }).min(1, "Un emoji est requis."),
  frequency: z.enum(['DAILY', 'WEEKLY'], {
    invalid_type_error: "Veuillez sélectionner une fréquence valide.",
  }),
  type: z.enum(['GOOD', 'BAD'], {
    invalid_type_error: "Veuillez sélectionner un type d'habitude valide.",
  }),
});

const CreateHabit = HabitFormSchema.omit({ id: true });

export async function createHabit(prevState: State, formData: FormData) {
  // Validation des données du formulaire
  const validatedFields = CreateHabit.safeParse({
    name: formData.get('name'),
    emoji: formData.get('emoji'),
    frequency: formData.get('frequency'),
    type: formData.get('type'),
  });

  // Si la validation échoue, retourner les erreurs
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Impossible de créer l\'habitude.',
    };
  }

  // Extraire les données validées
  const { name, emoji, frequency, type } = validatedFields.data;

  try {
    // Pour l'instant, on récupère le premier utilisateur disponible
    // TODO: Récupérer l'userId de la session authentifiée
    const existingUser = await prisma.user.findFirst();
    
    if (!existingUser) {
      return {
        message: 'Aucun utilisateur trouvé. Veuillez vous connecter.',
      };
    }
    
    // Créer la nouvelle habitude avec Prisma
    await prisma.habit.create({
      data: {
        userId: existingUser.id,
        name,
        emoji,
        frequency: frequency as 'DAILY' | 'WEEKLY',
        type: type as 'GOOD' | 'BAD',
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Erreur de base de données : Impossible de créer l\'habitude.',
    };
  }

  // Revalider la page et rediriger
  revalidatePath('/dashboard');
  redirect('/dashboard?success=created');
}

export async function createHabitFromDashboard(prevState: State, formData: FormData) {
  // Transformation des valeurs pour correspondre au schéma
  const rawFrequency = formData.get('frequency') as string;
  const rawType = formData.get('type') as string;
  
  const validatedFields = CreateHabit.safeParse({
    name: formData.get('name'),
    emoji: formData.get('emoji'),
    frequency: rawFrequency?.toUpperCase(),
    type: rawType?.toUpperCase(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Impossible de créer l\'habitude.',
    };
  }

  const { name, emoji, frequency, type } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findFirst();
    
    if (!existingUser) {
      return {
        message: 'Aucun utilisateur trouvé. Veuillez vous connecter.',
      };
    }
    
    // Créer la nouvelle habitude avec Prisma
    await prisma.habit.create({
      data: {
        userId: existingUser.id,
        name,
        emoji,
        frequency: frequency as 'DAILY' | 'WEEKLY',
        type: type as 'GOOD' | 'BAD',
      },
    });

    // Revalider la page mais ne pas rediriger
    revalidatePath('/dashboard');
    
    return {
      message: 'success',
      success: true,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Erreur de base de données : Impossible de créer l\'habitude.',
    };
  }
}

export async function toggleHabitCompletion(habitId: string, completed: boolean) {
  try {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Vérifier si l'habitude existe
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit) {
      throw new Error('Habitude non trouvée');
    }

    // Chercher ou créer le log pour aujourd'hui
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId,
        date: new Date(todayString),
      },
    });

    if (existingLog) {
      // Mettre à jour le log existant
      await prisma.habitLog.update({
        where: { id: existingLog.id },
        data: {
          completed,
          count: completed ? 1 : 0,
          updatedAt: new Date(),
        },
      });
    } else {
      // Créer un nouveau log
      await prisma.habitLog.create({
        data: {
          habitId,
          userId: habit.userId,
          date: new Date(todayString),
          completed,
          count: completed ? 1 : 0,
        },
      });
    }

    // Revalider la page pour mettre à jour l'affichage
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors du toggle de l\'habitude:', error);
    throw new Error('Erreur lors de la mise à jour de l\'habitude');
  }
}

const UpdateHabit = HabitFormSchema.omit({ id: true });

export async function updateHabit(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateHabit.safeParse({
    name: formData.get('name'),
    emoji: formData.get('emoji'),
    frequency: formData.get('frequency'),
    type: formData.get('type'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Impossible de modifier l\'habitude.',
    };
  }

  const { name, emoji, frequency, type } = validatedFields.data;

  try {
    await prisma.habit.update({
      where: { id },
      data: {
        name,
        emoji,
        frequency: frequency as 'DAILY' | 'WEEKLY',
        type: type as 'GOOD' | 'BAD',
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Erreur de base de données : Impossible de modifier l\'habitude.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard?success=updated');
}

export async function updateHabitFromDashboard(prevState: State, formData: FormData) {
  // Récupérer l'ID de l'habitude à modifier
  const habitId = formData.get('habitId') as string;
  
  if (!habitId) {
    return {
      message: 'ID de l\'habitude manquant.',
    };
  }

  // Transformation des valeurs pour correspondre au schéma
  const rawFrequency = formData.get('frequency') as string;
  const rawType = formData.get('type') as string;
  
  const validatedFields = UpdateHabit.safeParse({
    name: formData.get('name'),
    emoji: formData.get('emoji'),
    frequency: rawFrequency?.toUpperCase(),
    type: rawType?.toUpperCase(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Impossible de modifier l\'habitude.',
    };
  }

  const { name, emoji, frequency, type } = validatedFields.data;

  try {
    await prisma.habit.update({
      where: { id: habitId },
      data: {
        name,
        emoji,
        frequency: frequency as 'DAILY' | 'WEEKLY',
        type: type as 'GOOD' | 'BAD',
        updatedAt: new Date(),
      },
    });

    // Revalider la page mais ne pas rediriger
    revalidatePath('/dashboard');
    
    return {
      message: 'success',
      success: true,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Erreur de base de données : Impossible de modifier l\'habitude.',
    };
  }
}

export async function deleteHabit(id: string) {
  try {
    // Vérifier d'abord que l'habitude existe et est active
    const existingHabit = await prisma.habit.findUnique({
      where: { 
        id,
        isActive: true, // S'assurer que l'habitude est active
      },
    });

    if (!existingHabit) {
      throw new Error('Habitude non trouvée ou déjà supprimée.');
    }

    // Utiliser le soft delete au lieu de la suppression physique
    // Cela préserve l'historique des logs tout en masquant l'habitude
    await prisma.habit.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    // Si c'est une erreur Prisma P2025 (record not found)
    if (error instanceof Error && (error as any).code === 'P2025') {
      throw new Error('Habitude non trouvée ou déjà supprimée.');
    }
    throw new Error('Erreur de base de données : Impossible de supprimer l\'habitude.');
  }
}
