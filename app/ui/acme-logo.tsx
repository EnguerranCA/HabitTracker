import { josefinSans } from '@/app/ui/fonts';
import Image from 'next/image';

export default function HabitHissonLogo() {
  return (
    <div
      className={`${josefinSans.className} flex flex-row items-center leading-none text-background font-bold`}
    >
      <Image 
        src="/herisson-face.png"
        alt="Hérisson Habit&apos;Hisson"
        width={48}
        height={48}
        className="mr-3"
      />
      <p className="text-[32px] md:text-[38px]">Habit&apos;Hisson</p>
    </div>
  );
}
