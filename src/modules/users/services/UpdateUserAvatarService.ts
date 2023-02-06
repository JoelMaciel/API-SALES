import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepositoty from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepositoty);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not founf');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
