import { RegisterUser } from 'src/register/entities/register.entity';
import {
    BeforeInsert,
      Column,
      CreateDateColumn,
      Entity,
      JoinColumn,
      ManyToOne,
      PrimaryGeneratedColumn,
      UpdateDateColumn,
    } from 'typeorm';

    @Entity("expense")
export class Expense {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: null })
    category:string;

    @Column({ default: null })
    subCategory:string;

    @Column({ default: null })
    amount:string;

    @Column({ default: null })
    date:string;
    
    @Column({ default: null })
    paymentMethod:string;

    @Column({ default: null })
    description:string;

    @Column({name:'register_id',nullable:true,})
    registerId:number
    //default:2 

    
  
    @ManyToOne(()=>RegisterUser,(register)=>register.income)
    @JoinColumn({name:'register_id',})
    register:RegisterUser;
    
}
