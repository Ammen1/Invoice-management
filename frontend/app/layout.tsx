"use client";

import { Provider } from 'react-redux';
import store from '../store'
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

import './globals.css';
import { Plus_Jakarta_Sans as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

// export const metadata = {
//   title: 'Invoice Manager',
//   description:
//     'An Invoice Manager application designed to streamline invoice creation, management, and tracking for businesses. This platform offers intuitive features for generating and managing invoices, tracking payments, and generating reports.',
//   icons: {
//     icon: '/assets/icons/logo.webp',
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased',
          fontSans.variable
        )}
      >
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
