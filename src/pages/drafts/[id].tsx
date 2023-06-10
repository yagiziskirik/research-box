// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Post } from '@prisma/client';
import clipboard from 'clipboardy';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
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

export default function Draft({ draft }: DraftType) {
  const [tags, setTags] = useState(
    draft ? draft.tags.map((tagNew) => ({ id: tagNew, text: tagNew })) : []
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
  const [editableHeader, editHeader] = useState(draft ? draft.header : '');
  const [isEditHeader, isEditHeaderChange] = useState(false);
  function headerChange(el: ChangeEvent<HTMLTextAreaElement>) {
    setSaveButton(true);
    editHeader(el.target.value || '');
  }
  const toggleEditHeader = () => {
    isEditHeaderChange(!isEditHeader);
  };

  const [editableExp, editExp] = useState(
    draft ? draft.explanation : 'Explanation of the research'
  );
  const [isEditExp, isEditExpChange] = useState(false);
  function expChange(el: ChangeEvent<HTMLTextAreaElement>) {
    setSaveButton(true);
    editExp(el.target.value || '');
  }
  const toggleEditExp = () => {
    isEditExpChange(!isEditExp);
  };

  const [content, setContent] = useState(draft ? draft.content : '');
  const [autoSaveText, setAutoSaveText] = useState(draft ? draft.content : '');
  const [saveButton, setSaveButton] = useState(false);
  const [isLive, setIsLive] = useState(draft ? draft.published : false);

  const toggleIsLive = () => {
    setSaveButton(true);
    setIsLive(!isLive);
  };

  const alert = (
    msg: string,
    type: 'warning' | 'success' | 'info' | 'error' | 'default',
    position:
      | 'bottom-center'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'top-right'
      | 'top-left'
  ) => {
    toast(msg, {
      autoClose: 2000,
      type: type,
      theme: 'colored',
      position: position,
    });
  };

  const getTranscription = async () => {
    if (buttonLoading) {
      alert('Another process is ongoing', 'warning', 'bottom-center');
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
        alert('Prompt is ready to copy', 'info', 'bottom-center');
      } else {
        setButtonLoading(false);
        alert("Couldn't parse YouTube url", 'error', 'bottom-center');
      }
    } catch (err) {
      setButtonLoading(false);
      alert('You need to allow pasting.', 'error', 'bottom-center');
    }
  };

  const copyPrompt = async () => {
    await clipboard.write(copyText);
    setButtonCopy(false);
    alert('Paste prompt to ChatGPT', 'info', 'bottom-center');
  };

  useEffect(() => {
    const autosaveInterval = setTimeout(() => {
      if (autoSaveText != content) {
        savePage(false);
      }
    }, 5000);
    return () => {
      clearTimeout(autosaveInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, autoSaveText]);

  const setContentFunc = (ctx: string) => {
    setContent(ctx);
    setSaveButton(true);
  };

  const savePage = async (normalSave = true) => {
    setAutoSaveText(content);
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
        setSaveButton(false);
        if (normalSave) {
          alert('Successfully saved.', 'success', 'bottom-center');
        } else {
          alert('Auto saved.', 'info', 'top-center');
        }
      } else {
        alert('An error occured', 'error', 'bottom-center');
      }
    } catch (err) {
      alert(`${err}`, 'error', 'bottom-center');
    }
  };

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
      {session ? (
        <div className='mx-auto max-w-3xl px-4 pt-0 dark:text-white sm:px-6 md:pt-10 xl:max-w-5xl xl:px-0'>
          <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-5'>
                {isEditHeader ? (
                  <textarea
                    className='draft-header'
                    onChange={headerChange}
                    placeholder='New Draft'
                    value={editableHeader}
                  ></textarea>
                ) : (
                  <h1 className='md:leading-14 draft-header text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl'>
                    {editableHeader}
                  </h1>
                )}
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
              {isEditExp ? (
                <textarea
                  className='draft-exp'
                  onInput={expChange}
                  value={editableExp}
                >
                  {editableExp}
                </textarea>
              ) : (
                <p className='draft-exp text-lg leading-7 text-gray-500 dark:text-gray-400'>
                  {editableExp}
                </p>
              )}
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
          <Editor content={content} setContent={setContentFunc} />
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
            <Button
              leftIcon={HiSave}
              onClick={() => savePage()}
              disabled={!saveButton}
              variant={saveButton ? 'primary' : 'dark'}
            >
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
