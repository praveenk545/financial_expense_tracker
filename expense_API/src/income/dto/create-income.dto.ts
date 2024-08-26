import { IsDate } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreateIncomeDto {
  @ApiProperty()
  source:string;
  @ApiProperty()
  amount:string;
  @ApiPropertyOptional()
  currency:string;
  @ApiProperty()
  recurring:string;
  @ApiProperty()
  date:string;

  @ApiPropertyOptional()
  description:string;

   @ApiProperty()
  registerId:number
  
}
