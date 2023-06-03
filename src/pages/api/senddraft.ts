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
    console.log('received');
    console.log(req.method);
    if (req.method === 'POST') {
      const { id, header, explanation, content, user, tags, isLive } = req.body;
      const doesExist = await prisma.post.findUnique({
        where: {
          id: id,
        },
      });

      if (doesExist) {
        const result = await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            header,
            explanation,
            content,
            tags: tags,
            published: isLive,
          },
        });
        res.json(result);
      } else {
        const result = await prisma.post.create({
          data: {
            id,
            header,
            explanation,
            content,
            published: isLive,
            tags: tags,
            user: { connect: { id: user.id } },
          },
        });
        res.json(result);
      }
    }
    if (req.method === 'DELETE') {
      console.log('Delete received');
      const { id } = req.body;
      const result = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.json(result);
    }
  } else {
    console.log('Not Authorised');
    res.status(403).json('Not Authoroised');
  }
}
