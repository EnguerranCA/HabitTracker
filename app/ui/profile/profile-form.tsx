'use client';

import { User } from '@/app/lib/definitions';
import { updateProfile, changePassword } from '@/app/lib/actions';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signOut } from 'next-auth/react';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // États pour les formulaires
  const initialState = { message: '' };
  const [profileState, profileAction] = useFormState(updateProfile, initialState);
  const [passwordState, passwordAction] = useFormState(changePassword, initialState);

  // Fermer automatiquement les formulaires après succès
  useEffect(() => {
    if (profileState.message?.includes('succès')) {
      const timer = setTimeout(() => {
        setIsEditing(false);
        // Recharger la page pour mettre à jour les infos affichées
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [profileState.message]);

  useEffect(() => {
    if (passwordState.message?.includes('succès')) {
      const timer = setTimeout(() => {
        setShowPasswordForm(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [passwordState.message]);

  return (
    <div className="space-y-6">
      {/* Informations personnelles */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
        
        {!isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Nom</label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600 transition-colors shadow-md"
            >
              ✏️ Modifier
            </button>
          </div>
        ) : (
          <form action={profileAction} className="space-y-4">
            <input type="hidden" name="userId" value={user.id} />
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Nom</label>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:bg-primary-50 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none cursor-not-allowed transition-colors"
                disabled
                required
              />
              <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
            </div>
            
            {profileState.message && (
              <div className={`text-sm p-2 rounded-lg ${
                profileState.message.includes('succès') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {profileState.message}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600 transition-colors shadow-lg flex-1"
              >
                💾 Sauvegarder
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300 transition-colors shadow-md"
              >
                ❌ Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Mot de passe */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sécurité</h3>
        
        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="px-4 py-2 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600 transition-colors shadow-md"
          >
            🔐 Changer le mot de passe
          </button>
        ) : (
          <form action={passwordAction} className="space-y-4">
            <input type="hidden" name="userId" value={user.id} />
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Mot de passe actuel</label>
              <input
                type="password"
                name="currentPassword"
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:bg-primary-50 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:bg-primary-50 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:outline-none focus:bg-primary-50 transition-colors"
                required
              />
            </div>
            
            {passwordState.message && (
              <div className={`text-sm p-2 rounded-lg ${
                passwordState.message.includes('succès') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {passwordState.message}
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600 transition-colors shadow-lg flex-1"
              >
                🔄 Modifier
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300 transition-colors shadow-md"
              >
                ❌ Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Déconnexion */}
      <div className="border-t border-gray-100 pt-6">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-6 py-3 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors shadow-lg w-full"
        >
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  );
}