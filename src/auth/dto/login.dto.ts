import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @Field(() => String, { description: 'email of the admin' })
  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the Admin',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field(() => String, { description: 'password of the admin' })
  @ApiProperty({
    example: '123456789',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  password: string;
}
