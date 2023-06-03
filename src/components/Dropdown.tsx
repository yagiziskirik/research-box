// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';

interface LinksProp {
  href: string;
  label: string;
}

interface Props {
  links: LinksProp[];
  signInOut: () => void;
  signInOutText: string;
}

export default function Dropdown({ links, signInOut, signInOutText }: Props) {
  return (
    <Menu as='div' className='relative inline-block text-left md:hidden'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1 rounded-md bg-neutral-900 px-2 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-600 transition-colors duration-75 hover:bg-neutral-800'>
          <HiMenuAlt3 className='h-5 w-5 text-neutral-300' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-300 rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-600 dark:bg-neutral-800'>
          <div className='py-1'>
            {links.map(({ href, label }) => (
              <Menu.Item key={`${href}${label}`}>
                <Link
                  href={href}
                  className='block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-100'
                >
                  {label}
                </Link>
              </Menu.Item>
            ))}
          </div>
          <div className='py-1'>
            <Menu.Item>
              <Link
                href='#'
                className='text-primary-500 dark:text-primary-400 block px-4 py-2 text-sm'
                onClick={signInOut}
              >
                {signInOutText}
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
