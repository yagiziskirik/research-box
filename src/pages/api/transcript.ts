// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { NextApiRequest, NextApiResponse } from 'next';
import { YoutubeTranscript } from 'youtube-transcript';

type TranscriptType = {
  text: string;
  duration: number;
  offset: number;
};

const gt = (list: TranscriptType[]) => {
  return list.map((a) => a.text).join(' ');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.body;
    const resp = await YoutubeTranscript.fetchTranscript(url);
    res.json(
      'Can you summarise this transcribed video without the advertisements and sponsors and as bullet points:\n\n' +
        gt(resp)
    );
  } catch (err) {
    res.status(500).json('Internal server error');
  }
}
