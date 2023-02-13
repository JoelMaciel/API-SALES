import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepositoty = getCustomRepository(CustomersRepository);
    const pageNumber = 1;
    const pageSize = 10;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [result, total] = await customersRepositoty.findAndCount({
      skip,
      take,
      order: {
        id: 'ASC',
      },
    });

    const data: IPaginateCustomer = {
      from: skip,
      to: skip + take,
      per_page: pageSize,
      total: total,
      data: result,
    };

    return data;
  }
}

export default ListCustomerService;
