import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const doc = req.body;
  try{
    const query = `*[_type == "user" && email == '${doc?.email}'][0]`;

    const user = await client.fetch(query);
    
    if(user){
        if(doc.password !== user.password){
            res.status(400).json({message:'Email or password did not match'})
            return;
        }
        res.status(200).json(user);
    }
    if(!user){
       
            res.status(401).json({message: 'User does not exist'});
        
        } 
  }
  catch(e){
    res.status(500).json('error')
  }
}