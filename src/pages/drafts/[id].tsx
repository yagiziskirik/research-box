// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Post } from '@prisma/client';
import prisma from 'lib/prisma';
import clipboard from 'clipboardy';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import { YoutubeTranscript } from 'youtube-transcript';
import {
  HiChat,
  HiCheck,
  HiClipboardCopy,
  HiEye,
  HiEyeOff,
  HiPencil,
  HiSave,
} from 'react-icons/hi';
import { WithContext as ReactTags } from 'react-tag-input';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Editor from '@/components/Editor';
import Wrapper from '@/components/wrapper';

type DraftType = {
  draft: Post;
};

const KeyCodes = {
  comma: 188,
  enter: 13,
};

interface TagType {
  id: string;
  text: string;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Draft(draft: DraftType) {
  const [tags, setTags] = useState(
    draft.draft
      ? draft.draft.tags.map((tagNew) => ({ id: tagNew, text: tagNew }))
      : []
  );

  const [buttonLoading, setButtonLoading] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [buttonCopy, setButtonCopy] = useState(false);

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: TagType) => {
    setTags([
      ...tags,
      { id: tag.id.toLowerCase(), text: tag.text.toLowerCase() },
    ]);
  };

  const handleDrag = (tag: TagType, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const { data: session } = useSession();
  const router = useRouter();
  const [editableHeader, editHeader] = useState(
    draft.draft ? draft.draft.header : 'New Draft'
  );
  let cachedHeader = editableHeader;
  const [isEditHeader, isEditHeaderChange] = useState(false);
  function headerChange(el: ChangeEvent<HTMLHeadingElement>) {
    cachedHeader = el.target.textContent || '';
  }
  const toggleEditHeader = () => {
    if (isEditHeader) editHeader(cachedHeader);
    isEditHeaderChange(!isEditHeader);
  };

  const [editableExp, editExp] = useState(
    draft.draft ? draft.draft.explanation : 'Explanation of the research'
  );
  let cachedExp = editableExp;
  const [isEditExp, isEditExpChange] = useState(false);
  function expChange(el: ChangeEvent<HTMLParagraphElement>) {
    cachedExp = el.target.textContent || '';
  }
  const toggleEditExp = () => {
    if (isEditExp) editExp(cachedExp);
    isEditExpChange(!isEditExp);
  };

  const [content, setContent] = useState(
    draft.draft ? draft.draft.content : ''
  );
  const [isLive, setIsLive] = useState(
    draft.draft ? draft.draft.published : false
  );
  const toggleIsLive = () => {
    setIsLive(!isLive);
  };

  const alert = (
    msg: string,
    type: 'warning' | 'success' | 'info' | 'error' | 'default'
  ) => {
    toast(msg, {
      autoClose: 2000,
      type: type,
      theme: 'colored',
      position: 'bottom-center',
    });
  };

  const getTranscription = async () => {
    if (buttonLoading) {
      alert('Another process is ongoing', 'warning');
    }
    setButtonLoading(true);
    try {
      const cp = await clipboard.read();
      const resp = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cp }),
      });
      if (resp.status === 200) {
        const jsonData = await resp.json();
        setCopyText(jsonData);
        setButtonLoading(false);
        setButtonCopy(true);
        alert('Prompt is ready to copy', 'info');
      } else {
        setButtonLoading(false);
        alert("Couldn't parse YouTube url", 'error');
      }
    } catch (err) {
      setButtonLoading(false);
      alert('You need to allow pasting.', 'error');
    }
  };

  const copyPrompt = async () => {
    await clipboard.write(copyText);
    setButtonCopy(false);
    alert('Paste prompt to ChatGPT', 'info');
  };

  const savePage = async () => {
    const body = {
      id: router.query.id,
      header: editableHeader,
      explanation: editableExp,
      content,
      user: session?.user,
      tags: tags.map((tag) => tag.text),
      isLive,
    };
    try {
      const res = await fetch('/api/senddraft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        alert('Success!', 'success');
      } else {
        alert('An error occured', 'error');
      }
    } catch (err) {
      alert(`${err}`, 'error');
    }
  };

  return (
    <Wrapper>
      {session ? (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-5'>
                <h1
                  className='md:leading-14 draft-header text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl'
                  contentEditable={isEditHeader}
                  onInput={headerChange}
                >
                  {editableHeader}
                </h1>
                <IconButton
                  icon={isEditHeader ? HiCheck : HiPencil}
                  variant={isEditHeader ? 'primary' : 'dark'}
                  onClick={toggleEditHeader}
                ></IconButton>
              </div>
              <div className='ml-5 flex items-center space-x-3'>
                <p>Published</p>
                <IconButton
                  icon={isLive ? HiEye : HiEyeOff}
                  variant={isLive ? 'primary' : 'dark'}
                  onClick={toggleIsLive}
                ></IconButton>
              </div>
            </div>
            <div className='flex items-center space-x-5'>
              <p
                className='draft-exp text-lg leading-7 text-gray-500 dark:text-gray-400'
                contentEditable={isEditExp}
                onInput={expChange}
              >
                {editableExp}
              </p>
              <IconButton
                icon={isEditExp ? HiCheck : HiPencil}
                variant={isEditExp ? 'primary' : 'dark'}
                onClick={toggleEditExp}
              ></IconButton>
            </div>
            <ReactTags
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              autocomplete
            />
          </div>
          <Editor content={content} setContent={setContent} />
          <div className='mt-24 flex justify-end gap-2 md:mt-14'>
            <Button
              leftIcon={
                buttonLoading
                  ? undefined
                  : buttonCopy
                  ? HiClipboardCopy
                  : HiChat
              }
              onClick={buttonCopy ? copyPrompt : getTranscription}
              variant='dark'
            >
              {buttonLoading ? (
                <div className='lds-ellipsis'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : buttonCopy ? (
                'Copy'
              ) : (
                'ChatGPT Prompt'
              )}
            </Button>
            <Button leftIcon={HiSave} onClick={savePage}>
              Save
            </Button>
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
  const id = ctx.query.id as string;
  const session = await getSession(ctx);
  if (session) {
    const draft = await prisma.post.findUnique({
      where: { id: id },
    });
    return {
      props: { draft: JSON.parse(JSON.stringify(draft)) },
    };
  } else {
    return {
      props: {},
    };
  }
};
