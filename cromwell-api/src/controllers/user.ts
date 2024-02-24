/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { createUser, readUserByEmail, readUserById } from 'src/models/user';
import { hashGenerator, isHash, tokenGenerator } from 'src/utils';

// fetch user details controller
export const getUserController = async (req: any, res: Response) => {
  const user = await readUserById(req.userId as string);
  res.status(200).json({ success: 1, user: user });
};

// user registration controller
export const registerController = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    fullname: body?.fullname,
    email: body?.email,
    address: body?.address,
    hash: await hashGenerator(body.password),
  };
  try {
    const newUser = await createUser(data as any);
    const token = tokenGenerator(newUser.id);
    res.status(200).json({ success: 1, user: newUser, token });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(400).json({ success: 0, code: 'USER_ALREADY_EXIST' });
    }
  }
};

// user login controller
export const loginController = async (req: Request, res: Response) => {
  const body = req.body;
  const user = await readUserByEmail(body.email);
  if (!user) {
    return res.status(400).json({ success: 0, code: 'USER_NOT_FOUND' });
  }
  const isMatch = await isHash(body.password, user?.hash as string);
  if (!isMatch) {
    return res.status(400).json({ success: 0, code: 'WRONG_PASSWORD' });
  }
  const token = tokenGenerator(user?.id as string);
  res.status(200).json({ success: 1, user: user, token });
};
