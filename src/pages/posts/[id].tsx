// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Post, User } from '@prisma/client';
import prisma from 'lib/prisma';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiMail } from 'react-icons/hi';

import Wrapper from '@/components/wrapper';

type PostType = Post & { user: User };

interface DraftType {
  post: PostType;
}

export default function Posts({ post }: DraftType) {
  return (
    <Wrapper>
      {post !== null ? (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <article>
            <div className='xl:divide-y xl:divide-neutral-200 xl:dark:divide-neutral-700'>
              <header className='pt-6 xl:pb-6'>
                <div className='space-y-1 text-center'>
                  <dl className='space-y-10'>
                    <div>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-neutral-500 dark:text-neutral-400'>
                        <time dateTime={post.createdAt.toString()}>
                          {moment(post.createdAt).format('dddd, MMMM D, YYYY')}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div>
                    <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-5xl'>
                      {post.header}
                    </h1>
                  </div>
                </div>
              </header>
              <div
                className='divide-y divide-neutral-200 pb-8 dark:divide-neutral-700 xl:grid xl:grid-cols-4 xl:grid-rows-2 xl:gap-x-6 xl:divide-y-0'
                style={{ gridTemplateRows: 'auto 1fr' }}
              >
                <dl className='pb-6 pt-6 xl:border-b xl:border-neutral-200 xl:dark:border-neutral-700'>
                  <dt className='sr-only'>Author</dt>
                  <dd>
                    <ul className='flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8'>
                      <li className='flex items-center space-x-2'>
                        <span>
                          <Image
                            alt='avatar'
                            src={post.user.image as string}
                            width={10}
                            height={10}
                            decoding='async'
                            data-nimg='intrinsic'
                            className='h-10 w-10 rounded-full'
                          />
                        </span>
                        <dl className='whitespace-nowrap text-sm font-medium leading-5'>
                          <dt className='sr-only'>Name</dt>
                          <dd className='text-neutral-900 dark:text-neutral-100'>
                            {post.user.name}
                          </dd>
                          <dt className='sr-only'>Mail</dt>
                          <dd>
                            <a
                              target='_blank'
                              rel='noopener noreferrer'
                              href={'mailto:' + post.user.email}
                              className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1'
                            >
                              <HiMail /> Email
                            </a>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <div
                  className='prose dark:prose-dark main-article col-span-3 row-span-2 max-w-none space-y-2 pb-8 pt-10'
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <footer>
                  <div className='divide-neutral-200 text-sm font-medium leading-5 dark:divide-neutral-700 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                    <div className='pt-6'>
                      <h2 className='text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400'>
                        Tags
                      </h2>
                      <div className='flex flex-wrap'>
                        {post.tags.map((tag) => (
                          <Link
                            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase'
                            href={'/tags/' + tag}
                            key={tag}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='pt-6'>
                    <Link
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                      href='/blog'
                    >
                      ← Back to the blog
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
          </article>
        </div>
      ) : (
        <div
          className='layout relative flex flex-col items-center justify-center py-12 text-center'
          style={{ minHeight: 'calc(100vh - 8rem' }}
        >
          <h1 className='mt-4 dark:text-white'>Ooops!</h1>
          <p className='mt-2 text-sm text-neutral-800 dark:text-neutral-300'>
            Appearently, this research is rather not found or not published yet.
            Please contact to get more information.
          </p>
        </div>
      )}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const selId = ctx.query.id as string;
  const post = await prisma.post.findUnique({
    where: {
      id: selId,
    },
    include: {
      user: true,
    },
  });
  if (post && post.published) {
    return {
      props: { post: JSON.parse(JSON.stringify(post)) },
    };
  } else {
    return {
      props: { post: null },
    };
  }
};
