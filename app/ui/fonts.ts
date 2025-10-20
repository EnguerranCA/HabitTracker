import { Lusitana } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });

export const josefinSans = Josefin_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});
