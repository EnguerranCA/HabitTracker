'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteHabit } from '@/app/lib/actions';
import { useState } from 'react';

export function EditHabit({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/habits/${id}/edit`}
      className="rounded-md border border-border p-2 hover:bg-background-accent hover:border-primary-300 transition-colors"
      title="Modifier l'habitude"
    >
      <PencilIcon className="w-4 h-4 text-foreground-secondary hover:text-primary-600" />
    </Link>
  );
}

export function DeleteHabit({ id, name, onDelete }: { id: string; name: string; onDelete?: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHabit(id);
      // Si la suppression réussit, on notifie le parent et on ferme la confirmation
      onDelete?.(); // Mise à jour immédiate de l'UI
      setShowConfirm(false);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      
      // Afficher un message d'erreur plus convivial
      let errorMessage = 'Erreur lors de la suppression de l\'habitude';
      if (error instanceof Error) {
        if (error.message.includes('non trouvée')) {
          errorMessage = 'Cette habitude n\'existe plus ou a déjà été supprimée.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
      setShowConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-error text-white px-3 py-1 rounded text-xs hover:bg-error/90 transition-colors disabled:opacity-50"
          title="Confirmer la suppression"
        >
          {isDeleting ? '...' : 'Oui'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="bg-background-muted text-foreground px-3 py-1 rounded text-xs hover:bg-background-secondary transition-colors disabled:opacity-50"
          title="Annuler"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="rounded-md border border-border p-2 hover:bg-error-bg hover:border-error transition-colors"
      title={`Supprimer "${name}"`}
    >
      <TrashIcon className="w-4 h-4 text-foreground-secondary hover:text-error" />
    </button>
  );
}