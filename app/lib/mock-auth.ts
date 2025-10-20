// Utilisateur mock pour les tests sans authentification
// Utilisé quand la base de données Vercel est indisponible

export const mockUser = {
  id: 'mock-user-id',
  name: 'Testeur Hérisson',
  email: 'test@habithisson.com',
  image: null,
};

export const mockSession = {
  user: mockUser,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
};

// Fonction pour remplacer auth() pendant les tests
export async function getMockAuth() {
  return mockSession;
}

// Wrapper pour gérer les modes avec/sans authentification
export async function getAuthOrMock() {
  // En mode développement sans base de données, utiliser le mock
  if (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL) {
    return getMockAuth();
  }
  
  // En production ou avec base de données, utiliser la vraie auth
  try {
    const { auth } = await import('@/auth');
    return await auth();
  } catch (error) {
    console.warn('Authentification indisponible, utilisation du mock:', error);
    return getMockAuth();
  }
}