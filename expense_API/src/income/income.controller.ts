import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common';
import { CurrentUser } from 'src/register/user.decorator';
import { RegisterUser } from 'src/register/entities/register.entity';
import { CurrentUserGuard } from 'src/register/create-current.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Request, Response } from 'express';

@ApiTags("Income")
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('jwt'))
  // @UseRoles({
  //   possession:'any',
  //   action:'create',
  //   resource:'income',
  // })
  create(@Body() createIncomeDto: CreateIncomeDto,@Req() req:Request,@CurrentUser() user:RegisterUser) {
    console.log(user)
        
    //@ts-ignore
    return this.incomeService.create(createIncomeDto,req.user as RegisterUser);
  }

  
  @Get()
  // @UseGuards(CurrentUserGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @UseRoles({
  //   possession:'any',
  //   action:'read',
  //   resource:'income',
  // })
  findAll(@Query() query:any,@Req() req:Request,@CurrentUser() user:RegisterUser) {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }

  
  // @UseGuards(AuthGuard('jwt'),)
  // @UseRoles({
  //   possession:'any',
  //   action:'update',
  //   resource:'income',
  // })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomeService.update(id, updateIncomeDto);
  }

  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'),)
  // @UseRoles({
  //   possession:'any',
  //   action:'delete',
  //   resource:'income',
  // })
   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }
}
