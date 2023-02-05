import { Request, Response } from 'express';
import CreationSessionsService from '../services/CreationSessionsService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreationSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });
    return response.json(user);
  }
}
export default SessionsController;
