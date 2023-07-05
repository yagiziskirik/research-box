// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Post, User } from '@prisma/client';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

import ArticleCard from '@/components/articleCard';
import Wrapper from '@/components/wrapper';

type DraftType = {
  posts: Post[];
  selUser: User;
};

const getPreppedQuery = (selUser: User) => {
  const queryDict = {
    writer: selUser.name || 'ResearchBox',
    title: `All of ${selUser.name}'s researches in one place`,
    explanation: `Discover ${selUser.name}'s research prowess with ResearchBox, your go-to repository for curated insights.`,
    imgSrc: selUser.image || 'https://research-box.vercel.app/images/Logo.jpg',
  };
  return new URLSearchParams(queryDict).toString();
};

const POST_PER_PAGE = 5;

export default function Posts({ posts, selUser }: DraftType) {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = posts ? Math.ceil(posts.length / POST_PER_PAGE) : 0;
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;
  const filteredPosts = posts
    ? posts.filter((filterPost) => {
        const searchContent =
          filterPost.header +
          filterPost.explanation +
          filterPost.tags.join(' ');
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
      })
    : [];
  const finalPosts =
    searchValue != ''
      ? filteredPosts
      : filteredPosts.slice(
          (currentPage - 1) * POST_PER_PAGE,
          currentPage * POST_PER_PAGE
        );
  return (
    <Wrapper>
      <Head>
        <meta
          name='image'
          property='og:image'
          content={
            'https://research-box.vercel.app/api/og?' + getPreppedQuery(selUser)
          }
        />
        <meta
          name='twitter:image'
          content={
            'https://research-box.vercel.app/api/og?' + getPreppedQuery(selUser)
          }
        />
      </Head>

      {finalPosts.length > 0 ? (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
            <h1 className='md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-6xl'>
              {selUser ? selUser.name : 'Publisher not found'}
            </h1>
            <div className='relative max-w-lg'>
              <input
                aria-label='Search researches'
                type='text'
                placeholder='Search researches'
                className='focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
              />
              <svg
                className='absolute right-3 top-3 h-5 w-5 text-neutral-400 dark:text-neutral-300'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
          </div>
          {finalPosts.map(({ id, createdAt, header, explanation, tags }) => (
            <ArticleCard
              id={id}
              key={id}
              publishDate={createdAt}
              header={header}
              explanation={explanation}
              tags={tags}
              postOrDraft='posts'
              published={false}
              isLinked={false}
            />
          ))}
          {searchValue == '' && (
            <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
              <nav className='flex justify-between'>
                {!prevPage && (
                  <button
                    rel='previous'
                    className='cursor-auto disabled:opacity-50'
                    disabled={!prevPage}
                  >
                    Previous
                  </button>
                )}
                {prevPage && (
                  <button
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    <p rel='previous'>Previous</p>
                  </button>
                )}
                <span>
                  {currentPage} of {totalPages}
                </span>
                {!nextPage && (
                  <button
                    rel='next'
                    className='cursor-auto disabled:opacity-50'
                    disabled={!nextPage}
                  >
                    Next
                  </button>
                )}
                {nextPage && (
                  <button onClick={() => setCurrentPage(currentPage + 1)}>
                    <p rel='next'>Next</p>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      ) : (
        <div
          className='layout relative flex flex-col items-center justify-center py-12 text-center'
          style={{ minHeight: 'calc(100vh - 8rem' }}
        >
          <h1 className='mt-4 dark:text-white'>No researches found!</h1>
          <p className='mt-2 text-sm text-neutral-800 dark:text-neutral-300'>
            This publisher is not found or haven't published any articles yet.
          </p>
        </div>
      )}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const selId = ctx.query.id as string;
  if (selId) {
    const selUser = await prisma.user.findUnique({
      where: {
        id: selId,
      },
    });
    if (selUser) {
      const drafts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          user: selUser,
          published: true,
        },
      });
      return {
        props: {
          posts: JSON.parse(JSON.stringify(drafts)),
          selUser: JSON.parse(JSON.stringify(selUser)),
        },
      };
    } else {
      return { props: {} };
    }
  } else {
    return {
      props: {},
    };
  }
};
