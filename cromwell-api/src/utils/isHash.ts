import { compare } from 'bcryptjs';

const isHash = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export default isHash;
