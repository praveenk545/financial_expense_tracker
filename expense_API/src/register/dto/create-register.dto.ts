import { IsEmail, isNumber } from "@nestjs/class-validator";
import { UploadedFiles,UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isDate, isEmail } from "class-validator";
import { memoryStorage } from "multer";
import { filter } from "rxjs";
import { Binary } from "typeorm";
import { ApiBody, ApiConsumes,  } from '@nestjs/swagger';
import { FileSystemStoredFile, HasExtension, HasMimeType, IsFile, MaxFileSize, MemoryStoredFile, } from "nestjs-form-data";
export class CreateRegisterDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
   
    @ApiProperty()
    // @IsDate()
    dob:string;

    
     // @MaxFileSize(1e6)
    //@HasMimeType(['image/JPEG','image/JPG','image/PNG','image/jpeg','image/jpg','image/png'])
    // @ApiPropertyOptional({type:'array',items:{format:'binary',type:'string'},name:'file'})
    // @IsFile()
    // @HasExtension(['JPEG','JPG','PNG','jpeg','jpg','png'])
    // file:MemoryStoredFile;

   @ApiProperty()
   occupation:string;

    @ApiProperty()
    country:string;
}
