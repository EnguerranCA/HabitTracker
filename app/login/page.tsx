import HabitHissonLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background-accent to-background flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-6 md:-mt-32">
        <div className="flex h-24 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-4 md:h-40 shadow-lg">
          <div className="w-full text-center">
            <HabitHissonLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}