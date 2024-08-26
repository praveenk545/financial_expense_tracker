import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpenseService {
  constructor(@InjectRepository(Expense)
  private repo: Repository<Expense>,
  readonly entityManager: EntityManager, ){

  }
 async create(createExpenseDto: CreateExpenseDto) {
    try{
       let expense=new Expense();
       expense.category=createExpenseDto.category;
       expense.amount=createExpenseDto.amount;
       expense.date=createExpenseDto.date;
       expense.paymentMethod=createExpenseDto.paymentMethod;
       expense.registerId=createExpenseDto.registerId;
       expense.description=createExpenseDto.description;
       let saved = await this.repo.save(expense);
       return {
         statusCode: 200,
         message: ['Data saved'],
         data: { data: saved },
       };
    }
    catch (error){
      return {
        statusCode: 500,
        message: [error.message],
        stack: error.stack,
      };
    }
  }

  async findAll() {
    try {
      let data = await this.repo.query(
        'select * from expense'
      );
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

 async findOne(id: string) {
    try {
      //console.log('req', req.user);
      // id = req.user.roles == 'User' ? req.user.userId : id;
      let data = await this.repo.findOne({
        where: { id: id },
      });
      
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

 async update(id: string, updateExpenseDto: UpdateExpenseDto) {
  try {
    //console.log('req', req.user);
    // id = req.user.roles == 'user_value' ? req.user_value.id : id;
    let user = await this.repo.query(`select category,amount ,"date" ,"paymentMethod" ,description  from expense e    
    where id = '${id}'`);
    if (user.length > 0) {
      let userEntity = new Expense();
      if (updateExpenseDto.category) userEntity.category = updateExpenseDto.category;
      if (updateExpenseDto.amount) userEntity.amount = updateExpenseDto.amount;
      if (updateExpenseDto.date) userEntity.date = updateExpenseDto.date;
      if (updateExpenseDto.paymentMethod) userEntity.paymentMethod = updateExpenseDto.paymentMethod;
      if (updateExpenseDto.description) userEntity.description = updateExpenseDto.description;

      let saved = await this.repo.update({ id: id }, userEntity);
      return { statusCode: 200, message: ['User saved'], data: saved };
    } else {
      return { statusCode: 400, message: ['Invaild User'] };
    }
  } catch (error) {
    return { statusCode: 500, message: [error.message] };
  }
  }

 async remove(id: string) {
  try {
    let data = await this.repo.delete({
      id: id,
    });
    return { statusCode: 200, data: data };
  } catch (error) {
    return { statusCode: 500, message: [error.message] };
  }
  }
}
