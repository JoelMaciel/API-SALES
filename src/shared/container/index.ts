import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
