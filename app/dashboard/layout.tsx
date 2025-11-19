import MobileNavigation from '@/app/ui/mobile-navigation';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Mobile-first layout */}
      <div className="max-w-sm mx-auto min-h-screen relative">
        <div className="p-4">
          {children}
        </div>
        <MobileNavigation />
      </div>
    </div>
  );
}