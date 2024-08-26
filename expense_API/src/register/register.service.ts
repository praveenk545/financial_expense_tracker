import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { RegisterUser } from './entities/register.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import *as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { basename, extname } from 'path';
import { mkdirSync,existsSync, writeFileSync } from 'fs';
import { buffer } from 'stream/consumers';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(RegisterUser)
  private repo: Repository<RegisterUser>,
  readonly entityManager: EntityManager, private jwtService:JwtService){

  }
  //login
  async login(userLoginDto:LoginDto){
    console.log(userLoginDto)
  const user=await this.repo.createQueryBuilder('newuser').addSelect('newuser.password').where('newuser.email=:email',{email:userLoginDto.email}).getOne()

// console.log(user)
  if(!user){
  throw new UnauthorizedException('bad credentials--user not found');
}
else{
  //verify that the supplied password hash is matching with the password hash in database
   if(await this.verifyPassword(userLoginDto.password,user.password)){
  const token= await this.jwtService.signAsync({
    email:user.email,
    id:user.id
  });
  delete user.password;
  return {token,user}
   }
   else{
    throw new UnauthorizedException('bad credentials--password missmatch');
   }
}
  } 

  //verifypassword
  async verifyPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
  }
  //create
  async register(createRegisterDto: CreateRegisterDto) {
    const{email}=createRegisterDto;
    const checkForUser=await this.repo.findOne({where:{email}});
    if(checkForUser){
      throw new BadRequestException('email is already chosen, please chose another one');
  
     }else{
      try{
        let user:any=new RegisterUser()

        user.name=createRegisterDto.name;
       user.phone=createRegisterDto.phone;
        user.email=createRegisterDto.email;
        user.password=createRegisterDto.password;
        user.dob=createRegisterDto.dob;
        user.occupation=createRegisterDto.occupation;
        user.country=createRegisterDto.country;
        // const send=new FormData()
        // send.append(user,user)
        let data=await this.repo.save(user);
        console.log(user);
        return{
          statusCode: 200,
          message: ['Data saved'],
          data: { id: data },
        }
      }catch (error){
        return { statusCode: 500, message: [error.message] };
      }
   
    
      
     }
     
  }
 async gerUser(){
    try {
      const save=await this.repo.query('select * from  "RegisterUser" ');
      return { statusCode: 200, data: save };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
  }  }

  async findOne(id: string) {
    try {
      let data = await this.repo.findOne({
        where: { id: id },
      });
      
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }
}


