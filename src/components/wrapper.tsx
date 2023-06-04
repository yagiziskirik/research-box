// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from 'react';

import Header from './layout/Header';
import Layout from './layout/Layout';
import UnderlineLink from './links/UnderlineLink';
import Seo from './Seo';

interface Props {
  children: ReactNode;
}

export default function Wrapper({ children }: Props) {
  return (
    <Layout>
      <Seo />
      <main>
        <Header />
        <section>{children}</section>
      </main>
      <footer className='mt-5 flex w-full flex-col items-center py-5 text-xs font-light text-neutral-800/50 dark:text-neutral-100/30'>
        <div>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://github.com/yagiziskirik'>
            Yağız Işkırık
          </UnderlineLink>
        </div>
      </footer>
    </Layout>
  );
}
