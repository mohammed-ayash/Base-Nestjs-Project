import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Ar', description: 'The fullname of the user' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456789',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: true,
    description: 'is the admin avtive or not',
  })
  @IsBooleanString()
  active: boolean;
}
