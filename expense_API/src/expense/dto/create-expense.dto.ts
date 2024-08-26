import { IsDate } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty()
    @IsString()
    category:string;

    @ApiProperty()
    @IsString()
    amount:string;

    @ApiProperty()
    @IsDate()
    date:string;

    @ApiProperty()
    paymentMethod:string;
    
    @ApiProperty()
    registerId:number;
    
    @ApiPropertyOptional()
    description:string;

}
