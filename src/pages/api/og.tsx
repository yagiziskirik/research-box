// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ImageResponse } from '@vercel/og';
import Image from 'next/image';
import { NextRequest } from 'next/server';

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const writer = searchParams.get('writer') || 'ResearchBox';
  const title =
    searchParams.get('title') || 'All of your researches in one place';
  const exp =
    searchParams.get('explanation') ||
    'Unlock the power of knowledge organization with ResearchBox, your comprehensive research repository.';
  const imgSrc =
    searchParams.get('imgSrc') ||
    'https://research-box.vercel.app/images/Logo.jpg';
  const publishDate = searchParams.get('published') || 'Join the Force Today!';
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8f8f8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 90px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Image
            src={imgSrc}
            alt='logo'
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
            }}
          />
          <h1 style={{ margin: '0', fontSize: '40px' }}>{writer}</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{ margin: '0', fontSize: '35px', fontWeight: 'bold' }}>
            {title}
          </h2>
          <p style={{ margin: '0', opacity: '0.6', fontSize: '27px' }}>{exp}</p>
          <div
            style={{
              backgroundColor: '#dbdbdb',
              width: '100%',
              height: '8px',
              marginTop: '5px',
            }}
          ></div>
          <div
            style={{
              backgroundColor: '#545454',
              width: '40%',
              height: '8px',
              marginTop: '-18px',
              marginBottom: '5px',
            }}
          ></div>
          <h3 style={{ margin: '0', fontSize: '30px' }}>{publishDate}</h3>
          <p style={{ margin: '0', opacity: '0.5' }}>
            ResearchBox by yagiziskirik
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};

export default OgImageHandler;
