// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Post } from '@prisma/client';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession, signIn,useSession } from 'next-auth/react';

import Button from '@/components/buttons/Button';
import Wrapper from '@/components/wrapper';

interface TagsType {
  name: string;
  count: number;
}

interface RetTag {
  tags: TagsType[];
}

const getOnlyTags = (el: Post[]) => {
  const returnList: TagsType[] = [];
  const mappedList = el
    .map((a) => a.tags)
    .reduce(function (a, b) {
      return a.concat(b);
    });
  const uniqueKeys = [...new Set(mappedList)];
  uniqueKeys.forEach((q) => {
    returnList.push({
      name: q,
      count: mappedList.filter((x) => x == q).length,
    });
  });
  return returnList;
};

export default function Posts({ tags }: RetTag) {
  const { data: session } = useSession();
  return (
    <Wrapper>
      {session ? (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
            <div className='space-x-2 pb-8 pt-6 md:space-y-5'>
              <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl'>
                Tags
              </h1>
            </div>
            <div className='flex max-w-lg flex-wrap'>
              {tags.map(({ name, count }) => (
                <div className='mb-2 mr-5 mt-2' key={`${name}-${count}`}>
                  <a
                    className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase'
                    href={'/tags/' + name}
                  >
                    {name}
                  </a>
                  <a
                    className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                    href={'/tags/' + name}
                  >
                    {' '}
                    ({count})
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className='layout relative flex flex-col items-center justify-center py-12 text-center'
          style={{ minHeight: 'calc(100vh - 8rem' }}
        >
          <h1 className='mt-4 dark:text-white'>You have not logged in yet</h1>
          <p className='mt-2 text-sm text-neutral-800 dark:text-neutral-300'>
            You don't need to share your email and things with me to get
            started. Just log in here:
          </p>
          <p className='text-primary-600 dark:text-primary-400 mt-5 text-sm'>
            <Button onClick={() => signIn()}>Login</Button>
          </p>
        </div>
      )}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        user: session.user,
        published: true,
      },
    });
    return {
      props: { tags: getOnlyTags(posts) },
    };
  } else {
    return {
      props: { tags: [] },
    };
  }
};
