import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepositoty from '../typeorm/repositories/UsersRepository';

interface IResquest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreationSessionsService {
  public async execute({ email, password }: IResquest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepositoty);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, '6ffebc8d78eef4463c1948ffa584d283', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
export default CreationSessionsService;
