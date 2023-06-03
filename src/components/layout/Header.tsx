import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import Button from '../buttons/Button';
import Dropdown from '../Dropdown';
import NextImage from '../NextImage';

const links = [
  { href: '/posts', label: 'Researches' },
  { href: '/tags', label: 'Tags' },
  { href: '/drafts', label: 'All Work' },
];

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className='sticky top-0 z-50 bg-white dark:bg-neutral-900'>
      <div className='layout mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
        <Link href='/' className='text-white'>
          <NextImage
            src='/images/DarkLogo.png'
            darkSrc='/images/WhiteLogo.png'
            alt='Logo'
            useSkeleton
            width={150}
            height={60}
          />
        </Link>
        <nav>
          <ul className='hidden items-center justify-between space-x-4 md:flex'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={href}
                  className='text-neutral-600 dark:text-neutral-300'
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              {session ? (
                <Button onClick={() => signOut()}>Logout</Button>
              ) : (
                <Button onClick={() => signIn()}>Login</Button>
              )}
            </li>
          </ul>
          <Dropdown
            links={links}
            signInOut={session ? signOut : signIn}
            signInOutText={session ? 'Logout' : 'Login'}
          />
        </nav>
      </div>
    </header>
  );
}
