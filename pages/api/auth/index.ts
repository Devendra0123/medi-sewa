import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const doc = req.body;
  try{
    client.createIfNotExists(doc);
    res.status(200).json('Login successful')
  }
  catch(e){
    res.status(500).json('error')
  }
}