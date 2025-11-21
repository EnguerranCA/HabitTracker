import React from "react";

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Loading() {
  return (
    <div className="p-4 space-y-6">
      {/* Titre */}
      <div className="mb-6">
        <div className={`${shimmer} relative mb-2 h-8 w-40 overflow-hidden rounded-md bg-gray-100`} />
        <div className={`${shimmer} relative h-4 w-56 overflow-hidden rounded-md bg-gray-100`} />
      </div>

      {/* Formulaires */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulaire informations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className={`${shimmer} relative mb-4 h-6 w-48 overflow-hidden rounded-md bg-gray-100`} />
          <div className="space-y-4">
            {/* Champ nom */}
            <div>
              <div className={`${shimmer} relative mb-2 h-4 w-12 overflow-hidden rounded-md bg-gray-100`} />
              <div className={`${shimmer} relative h-10 w-full overflow-hidden rounded-md bg-gray-100`} />
            </div>
            {/* Champ email */}
            <div>
              <div className={`${shimmer} relative mb-2 h-4 w-12 overflow-hidden rounded-md bg-gray-100`} />
              <div className={`${shimmer} relative h-10 w-full overflow-hidden rounded-md bg-gray-100`} />
            </div>
            {/* Bouton */}
            <div className={`${shimmer} relative h-10 w-32 overflow-hidden rounded-md bg-gray-100`} />
          </div>
        </div>

        {/* Formulaire mot de passe */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className={`${shimmer} relative mb-4 h-6 w-40 overflow-hidden rounded-md bg-gray-100`} />
          <div className="space-y-4">
            {/* Champs mots de passe */}
            <div>
              <div className={`${shimmer} relative mb-2 h-4 w-24 overflow-hidden rounded-md bg-gray-100`} />
              <div className={`${shimmer} relative h-10 w-full overflow-hidden rounded-md bg-gray-100`} />
            </div>
            <div>
              <div className={`${shimmer} relative mb-2 h-4 w-32 overflow-hidden rounded-md bg-gray-100`} />
              <div className={`${shimmer} relative h-10 w-full overflow-hidden rounded-md bg-gray-100`} />
            </div>
            {/* Bouton */}
            <div className={`${shimmer} relative h-10 w-40 overflow-hidden rounded-md bg-gray-100`} />
          </div>
        </div>
      </div>
    </div>
  );
}