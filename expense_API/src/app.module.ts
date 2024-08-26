import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { RegisterModule } from './register/register.module';
import { RegisterUser } from './register/entities/register.entity';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { Income } from './income/entities/income.entity';
import { Expense } from './expense/entities/expense.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './register/user-roles';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
   // NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [RegisterUser,Income,Expense],
      synchronize: true,
    }),
    RegisterModule,
    IncomeModule,
    ExpenseModule,
    AccessControlModule.forRoles(roles)

  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
