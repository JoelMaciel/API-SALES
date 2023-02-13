import { Request, Response } from 'express';
import CreationSessionsService from '../services/CreationSessionsService';
import { instanceToInstance } from 'class-transformer';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreationSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });
    return response.status(201).json(instanceToInstance(user));
  }
}
export default SessionsController;
