import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    return res.status(401).send('Email not available.');
  }

  res.json(user);
};
