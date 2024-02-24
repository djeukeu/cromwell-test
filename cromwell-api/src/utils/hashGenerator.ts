import { hash } from 'bcryptjs';

const hashGenerator = async (password: string) => {
  const hashData = hash(password, 10);
  return hashData;
};

export default hashGenerator;
