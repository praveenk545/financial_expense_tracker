import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUser } from './entities/register.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports:[TypeOrmModule.forFeature([RegisterUser]),
  
   NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  JwtModule.register({
    secret:'secretKey',
    signOptions:{
      algorithm:'HS512',
      expiresIn:'1d'
    }
  }),PassportModule.register({defaultStrategy:'jwt'})],

  controllers: [RegisterController],
  providers: [RegisterService,JwtStrategy,],
})
export class RegisterModule {}
