import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepositoty from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepositoty);

    const users = await userRepository.find();
    return users;
  }
}

export default ListUserService;
