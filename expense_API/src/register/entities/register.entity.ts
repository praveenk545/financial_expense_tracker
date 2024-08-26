import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
//import slugify from "slugify";
import {
  BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    IsAny,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UserRoles } from '../user-roles';
import { Income } from 'src/income/entities/income.entity';
import { MemoryStoredFile } from 'nestjs-form-data/dist/classes/storage';
import { Expense } from 'src/expense/entities/expense.entity';


  @Entity("RegisterUser")
export class RegisterUser {
    @PrimaryGeneratedColumn()
    id: string;

    // @PrimaryGeneratedColumn('uuid')
    // user_id: string;
  
    @Column({ default: null })
    name: string;
    
    @Column({ default: null })
    email: string;

    @Column({ default: null })
    phone: string;
    
    @Column({ default: null ,select:false})
    password: string;

    @Column({default:null })
    dob:string;

    @Column({ default: null })
    file:string;
    
    @Column({ default: null })
    occupation:string;

    @Column({type:'enum',enum:UserRoles,default:UserRoles.Reader})
    roles:UserRoles
    
    // @Column({default:null})
    // slug:string;

    // @Column({nullable:true})
    // file:string;


    @Column({nullable:true})
    country:string


    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createAt: string;
  
    @UpdateDateColumn()
    updateAt: string;

    @OneToMany(()=>Income,(income)=>income.register)
    income:Income;

    @OneToMany(()=>Expense,(e)=>e.register)
    expense:Income;

  @BeforeInsert()
  hash(){
     this.password=bcrypt.hashSync(this.password,10)
  }

  // @BeforeInsert()
  // slugifyPost(){
  //     this.slug=slugify(this.title.substring(0,20),{lower:true,replacement:'_'});
     

  // }
}

 

