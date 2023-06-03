// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.user) {
    const { id } = req.body;
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.json(result);
  } else {
    console.log('Not Authorised');
    res.status(403).json('Not Authoroised');
  }
}
