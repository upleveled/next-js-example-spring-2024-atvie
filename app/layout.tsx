import './globals.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import CookieBanner from './CookieBanner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    default: 'Home | UpLeveled',
    template: '%s | UpLeveled',
  },
  description: 'Generated by create next app',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <div>
            <CookieBanner />
            <nav>
              {/* This is not optimized */}
              {/* <a href="/">Home</a> */}

              {/* This is optimized */}
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/animals">Animals</Link>
              <Link href="/fruits">Fruits</Link>
            </nav>
            {Math.floor(Math.random() * 10)}
          </div>
        </header>

        <main>{children}</main>

        <footer>Footer</footer>
      </body>
    </html>
  );
}