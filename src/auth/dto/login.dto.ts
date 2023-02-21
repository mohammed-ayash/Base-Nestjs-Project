import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the Admin',
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
  password: string;
}
