import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (response: any, addUser: any) => {
    
    const decoded : { name: string, picture: string, sub: string, email: string } = jwt_decode(response.credential);
    const {name,picture,sub,email} = decoded;
 
  
  const user = {
    _id: sub,
    _type: 'user',
    email: email,
    userName: name,
    image: picture,
  };
  addUser(user)
  await axios.post(`/api/auth`, user);
};