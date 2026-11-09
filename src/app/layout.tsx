import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '精品商店 - Shopping Cart Challenge',
  description: 'AI-Assisted Frontend Development Challenge using Next.js',
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 notranslate" translate="no">
        {children}
      </body>
    </html>
  );
}
