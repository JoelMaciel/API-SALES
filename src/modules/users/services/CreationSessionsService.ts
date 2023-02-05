import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepositoty from '../typeorm/repositories/UsersRepository';

interface IResquest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreationSessionsService {
  public async execute({ email, password }: IResquest): Promise<User> {
    const userRepository = getCustomRepository(UserRepositoty);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    return user;
  }
}
export default CreationSessionsService;
