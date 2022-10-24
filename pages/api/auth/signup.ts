import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const doc = req.body;
  try{
    const query = `*[_type == "user" && email == '${doc?.email}'][0]`;

    const user = await client.fetch(query);
    
    if(user){
        res.status(403).json({message:'User already exists.'})
        return;
    }
    if(!user){
        client.create(doc).then((data) => {
            res.status(201).json(data);
          });
        } 
  }
  catch(e){
    res.status(500).json('error')
  }
}