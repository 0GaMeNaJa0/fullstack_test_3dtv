
import localFont from 'next/font/local'
import "./globals.css";

// layout.tsx located at client/src/app/layout.tsx
const giorgio = localFont({
  src: [
    { path: '../../public/fonts/GiorgioSans/GiorgioSans-Bold-Trial.otf', weight: '700', style: 'bold' },
  ],
  display: 'swap',
  variable: '--font-giorgio'
});

const dbHeavent = localFont({
  src: [
    { path: '../../public/fonts/DBHeaventCond/DB-Heavent-Cond-v3.2.1.ttf', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-dbheavent'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dbHeavent.className} ${giorgio.variable}`}>
      <body
        className={`antialiased w-full`}
      >
        {children}   
      </body>
    </html>
  );
}
