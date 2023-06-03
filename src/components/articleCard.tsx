// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import moment from 'moment';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi';

import IconButton from './buttons/IconButton';

interface Props {
  id: string;
  publishDate: Date;
  header: string;
  tags: string[];
  explanation: string;
  published: boolean;
  postOrDraft: 'posts' | 'drafts';
  isDelete?: boolean;
  deleteFunc?: () => void;
  indexPage?: boolean;
}

export default function ArticleCard({
  id,
  publishDate,
  header,
  tags,
  explanation,
  published,
  postOrDraft,
  isDelete = false,
  deleteFunc,
  indexPage,
}: Props) {
  return (
    <article className='space-y-2 py-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
      <dl>
        <dt className='sr-only'>Published on</dt>
        <dd className='text-base font-medium leading-6 text-neutral-500 dark:text-neutral-400'>
          <time dateTime={publishDate.toString()}>
            {moment(publishDate).format('MMMM D, YYYY')}
          </time>
        </dd>
      </dl>
      <div className='flex items-center justify-between xl:col-span-3'>
        <div className='space-y-3'>
          <div>
            <h3 className='flex items-center text-2xl font-bold leading-8 tracking-tight'>
              <Link
                className='text-neutral-900 dark:text-neutral-100'
                href={'/' + postOrDraft + '/' + id}
              >
                {header}
              </Link>
              {published && <HiOutlineEye className='text-primary-400 ml-3' />}
            </h3>
            <div className='flex flex-wrap'>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase'
                  href={'/tags/' + tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className='prose max-w-none text-neutral-500 dark:text-neutral-400'>
            {explanation}
          </div>
          {indexPage && (
            <div className='text-base font-medium leading-6'>
              <Link
                className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                href={'/' + postOrDraft + '/' + id}
              >
                Read more →
              </Link>
            </div>
          )}
        </div>
        {isDelete && (
          <IconButton icon={HiTrash} variant='danger' onClick={deleteFunc} />
        )}
      </div>
    </article>
  );
}
