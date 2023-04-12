import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateAdminDto {
  @Field(() => String, { description: 'full name of the admin' })
  @ApiProperty({ example: 'John Ar', description: 'The fullname of the admin' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @Field(() => String, { description: 'email of the admin' })
  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the admin',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field(() => String, { description: 'phone number of the admin' })
  @ApiProperty({
    example: '009639000000',
    description: 'The phone number of the admin',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @Field(() => String, { description: 'password of the admin' })
  @ApiProperty({
    example: '123456789',
    description: 'The password of the admin',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field(() => Boolean, { description: 'is the admin active ' })
  @ApiProperty({
    example: true,
    description: 'is the admin avtive or not',
  })
  @IsBoolean()
  active: boolean;
}
