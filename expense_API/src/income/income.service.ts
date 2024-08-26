import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { EntityManager, Repository } from 'typeorm';
import { RegisterUser } from 'src/register/entities/register.entity';
import { createDecipheriv } from 'crypto';

@Injectable()
export class IncomeService {
  constructor(@InjectRepository(Income)
  private repo: Repository<Income>,
  readonly entityManager: EntityManager, ){ }
 async create(createIncomeDto: CreateIncomeDto,user:RegisterUser) {
  
    try {
     // error TypeError: Cannot read properties of undefined (reading 'id')
      // user.userId=newUser.id;
    let income= new Income()
       income.source=createIncomeDto.source;
       income.amount=createIncomeDto.amount;
       income.currency=createIncomeDto.currency;
       income.recurring=createIncomeDto.recurring;
       income.date=createIncomeDto.date;
       income.registerId=createIncomeDto.registerId;
       income.description=createIncomeDto.description;
       let saved = await this.repo.save(income);
      // user.slug=createNewpostDto.title.split("").join('_').toLocaleLowerCase();
    //  Object.assign(user,createIncomeDto)
    // if(saved!==null){
    //   console.log(saved)
    // }
    // else{
    //   console.log("error accured")
    // }
      return {
        statusCode: 200,
        message: ['Data saved'],
        data: { id: saved },
      };
    } catch (error) {
      console.log('error', error);
      return {
        statusCode: 500,
        message: [error.message],
        stack: error.stack,
        type:error.type,
      };
    }
  }

 async findAll() {
  //query?:string
  try {
    let data = await this.repo.query(
      `select * from  income i order by id`
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

async  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    try {
      //console.log('req', req.user);
      // id = req.user.roles == 'user_value' ? req.user_value.id : id;
      let user = await this.repo.query(`select "source" ,amount ,"date" ,currency ,recurring, description  from income i    
      where id = '${id}'`);
      if (user.length > 0) {
        let userEntity = new Income();
        if (updateIncomeDto.source) userEntity.source = updateIncomeDto.source;
        if (updateIncomeDto.amount) userEntity.amount = updateIncomeDto.amount;
        if (updateIncomeDto.currency) userEntity.currency = updateIncomeDto.currency;
        if (updateIncomeDto.recurring) userEntity.recurring = updateIncomeDto.recurring;
        if (updateIncomeDto.date) userEntity.date = updateIncomeDto.date;
        if (updateIncomeDto.description) userEntity.description = updateIncomeDto.description;


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