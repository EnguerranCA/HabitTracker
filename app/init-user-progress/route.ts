import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Récupérer tous les utilisateurs qui n'ont pas de progress
    const usersWithoutProgress = await prisma.user.findMany({
      where: {
        progress: null
      }
    });

    console.log(`Trouvé ${usersWithoutProgress.length} utilisateurs sans progress`);

    // Créer un enregistrement progress pour chaque utilisateur
    for (const user of usersWithoutProgress) {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          level: 1,
          xp: 0,
          hedgehogState: 1,
          glandCount: 0
        }
      });
      console.log(`Progress créé pour utilisateur ${user.name} (${user.id})`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Progress initialisé pour ${usersWithoutProgress.length} utilisateurs`,
      users: usersWithoutProgress.map(u => ({ id: u.id, name: u.name }))
    });

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du progress:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'initialisation' },
      { status: 500 }
    );
  }
}