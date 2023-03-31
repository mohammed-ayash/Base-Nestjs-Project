import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterAdminDto {
  @ApiProperty({
    example: 'John Ar',
    description: 'The fullname of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  full_name: string;

  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '009639000000',
    description: 'The phone number of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty({
    example: true,
    description: 'is the admin avtive or not',
    required: false,
  })
  @IsBooleanString()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    example: 1,
    description: 'The page number',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'The item count per Page',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
