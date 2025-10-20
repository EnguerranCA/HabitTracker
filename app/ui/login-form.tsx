'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 rounded-xl bg-background border border-border shadow-md px-6 pb-6 pt-8">
        <h1 className={`${lusitana.className} mb-6 text-2xl text-foreground text-center`}>
          Connectez-vous à votre compte
        </h1>
        <div className="w-full space-y-4">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-border bg-background py-3 pl-10 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
                id="email"
                type="email"
                name="email"
                placeholder="Entrez votre adresse email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground-muted peer-focus:text-primary-500 transition-colors" />
            </div>
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-foreground"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-border bg-background py-3 pl-10 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
                id="password"
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground-muted peer-focus:text-primary-500 transition-colors" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-background font-medium py-3 rounded-lg transition-colors shadow-md" aria-disabled={isPending}>
          Se connecter <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1 mt-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-error" />
              <p className="text-sm text-error">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}