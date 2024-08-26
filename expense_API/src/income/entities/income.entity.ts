import { Exclude } from 'class-transformer';
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

    @Entity()
export class Income {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: null })
    source:string;
    // investIn: salay, freelance etc
     //The category of income (e.g., wages, bonuses, rental income).

    @Column({ default: null })
    amount:string;

    @Column({ default: null })
    date:string;
//The date when the income was received

    @Column({ default: null })
    currency:string;

    @Column({ default: null })
    recurring:string;
    //Recurring: Whether the income is recurring (Yes/No)
    @Column({ default: null })
    description:string;

    @CreateDateColumn()
    createAt: string;
  
    @UpdateDateColumn()
    updateAt: string;

    // @Column({default:null})
    // @Exclude()
    // userId:number;

    // @ManyToOne(()=>RegisterUser,(user)=>user.income,{eager:true})
    // @JoinColumn({name:'userId',referencedColumnName:'id'})
    // user:RegisterUser

    @Column({name:'register_id',nullable:true,})
    registerId:number
    //default:2 

    
  
    @ManyToOne(()=>RegisterUser,(register)=>register.income)
    @JoinColumn({name:'register_id',})
    register:RegisterUser;
   
}
