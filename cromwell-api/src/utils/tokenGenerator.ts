import { sign } from 'jsonwebtoken';
import ms from 'ms';
import config from 'src/config';

const tokenGenerator = (id: string) => {
  const token = sign({ id: id }, config.secret_key as string, { expiresIn: ms('1h') });
  return token;
};

export default tokenGenerator;
