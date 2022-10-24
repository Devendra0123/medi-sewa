import type { NextApiRequest, NextApiResponse } from 'next';

import { allBlogsQuery } from '../../../utils/query';
import { client } from '../../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = allBlogsQuery();

    const data = await client.fetch(query);

    res.status(200).json(data);
  } else if (req.method === 'POST') {
   
    const doc = req.body;
   
    client.create(doc).then(() => {
      res.status(200).json('Blog published');
    });
  }
}