import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/client';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'PUT') {
    const post = req.body;

    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .set(post)
      .commit()
      .then((data) => {
        console.log('document is updated! New document:')
        console.log(data)
      })
      .catch((err) => {
        console.error('update failed: ', err.message)
      })

    res.status(200).json(data);
  }
  if(req.method === 'DELETE'){
    const { id }: any = req.query;

    client
    .delete(id)
    .then(() => {
      console.log('Doc deleted')
    })
    .catch((err) => {
      console.error('Delete failed: ', err.message)
    })
    res.json({message: 'Post deleted'})
}
}