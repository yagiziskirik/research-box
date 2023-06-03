import { Post } from '@prisma/client';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import * as React from 'react';

import ArticleCard from '@/components/articleCard';
import ArrowLink from '@/components/links/ArrowLink';
import Wrapper from '@/components/wrapper';
import Head from 'next/head';

type PostType = {
  posts: Post[];
};

export default function HomePage({ posts }: PostType) {
  const { data: session } = useSession();
  return (
    <Wrapper>
      <Head>
        <meta
          name='image'
          property='og:image'
          content='https://research-box.vercel.app/api/og'
        />
        <meta
          name='twitter:image'
          content='https://research-box.vercel.app/api/og'
        />
      </Head>
      {!session ? (
        <div
          className='layout relative flex flex-col items-center justify-center py-12 text-center'
          style={{ minHeight: 'calc(100vh - 8rem' }}
        >
          <h1 className='mt-4 dark:text-white'>Welcome to the ResearchBox!</h1>
          <p className='mt-2 text-sm text-neutral-800 dark:text-neutral-300'>
            This is a safe place to store your researches which I do personally.
            You can create drafts and release your researches on here. If you
            wish, you can also share your researches with the public.
          </p>
          <p className='text-primary-600 dark:text-primary-400 mt-2 text-sm'>
            <ArrowLink href='https://github.com/yagiziskirik/research-box'>
              Learn More in Github
            </ArrowLink>
          </p>
        </div>
      ) : (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <div className='divide-y divide-neutral-200 dark:divide-neutral-700'>
            <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
              <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-6xl'>
                Latest
              </h1>
              <p className='text-lg leading-7 text-neutral-500 dark:text-neutral-400'>
                Latest researches you have finished and published
              </p>
            </div>
            <ul className='divide-y divide-neutral-200 dark:divide-neutral-700'>
              {posts.map(({ id, createdAt, tags, header, explanation }) => (
                <li className='py-12' key={id}>
                  <ArticleCard
                    id={id}
                    tags={tags}
                    header={header}
                    explanation={explanation}
                    postOrDraft='posts'
                    publishDate={createdAt}
                    indexPage={true}
                    published={false}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-end text-base font-medium leading-6'>
            <Link
              className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              href='/posts'
            >
              All Researches →
            </Link>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    const posts = await prisma.post.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        user: session.user,
        published: true,
      },
    });
    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } else {
    return {
      props: { posts: [] },
    };
  }
};
