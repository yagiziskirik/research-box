// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export default function Editor({ content, setContent }: Props) {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ];
  return (
    <ReactQuill
      theme='snow'
      modules={{ toolbar: toolbarOptions }}
      value={content as string}
      onChange={setContent}
      className='h-screen-2'
    />
  );
}
