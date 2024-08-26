import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CurrentUser } from './user.decorator';
import { CurrentUserGuard } from './create-current.guard';
import { RegisterUser } from './entities/register.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

@ApiTags('Expensive Tracker')

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}


  @Post('login')
  async  userLogin(@Body()userLoginDto:LoginDto,@Res()res:Response){
    
      const{token,user} = await this.registerService.login(userLoginDto)
      res.cookie('IsAuthenticated',true,{maxAge:2*60*60*100,
        secure:true,
        sameSite:'strict',
        httpOnly:true,
        // path:'1'


      })//max age 2 hours
      res.cookie('Authentication',token,{
        // httpOnly:true,
        maxAge:20*60*60*100,
        httpOnly: true, // Cookie is not accessible via JavaScript
        secure: true, // Cookie is sent only over HTTPS
        sameSite: 'strict' // CSRF protection
      });
      return res.send({success:true,user,token})
    
    }

    @Post('register')
//  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
//  @FormDataRequest({storage: MemoryStoredFile})
  create(@Body() createNewUserDto:CreateRegisterDto,@Req() req:Request, ) {
    console.log(createNewUserDto,"values");
    return this.registerService.register(createNewUserDto);
  }

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser()user:RegisterUser){
    return {
      status:!!user,user
      
    }
  }

  // Route  to logout the user

  @Post('logout')
  logout(@Req()req:Request,@Res()res:Response){
res.clearCookie('Authentication');
res.clearCookie('IsAuthenticated');
return res.status(200).send({success:true});
  }

@Get('user')
user(){
  return this.registerService.gerUser();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.registerService.findOne(id);
}
}
