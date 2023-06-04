// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dynamic from 'next/dynamic';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export default function Editor({ content, setContent }: Props) {
  return (
    <MDEditor
      value={content}
      onChange={(val) => setContent(val || '')}
      height={500}
      preview='edit'
      className='h-screen-2'
    />
  );
}
