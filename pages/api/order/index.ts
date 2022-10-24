import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    if (req.method === 'POST') {
   
      const doc = req.body;
     
      client.create(doc).then((data) => {
        res.status(200).json(data);
      });
    }
  }
 catch(error){
  res.status(500).json(error);
 }
}