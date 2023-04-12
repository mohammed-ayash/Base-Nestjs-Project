import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Field(() => Int, { description: 'The Id of the admin Entity' })
  @ApiProperty({
    example: 10,
    description: 'The item count per Page',
    required: false,
  })
  @IsNumber()
  adminId: number;

  @Field(() => String, { description: 'full name of the admin' })
  @ApiProperty({ example: 'John Ar', description: 'The fullname of the admin' })
  @IsOptional()
  @IsString()
  full_name: string;

  @Field(() => String, { description: 'email of the admin' })
  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the admin',
  })
  @IsEmail()
  @IsOptional()
  @IsString()
  email: string;

  @Field(() => String, { description: 'phone number of the admin' })
  @ApiProperty({
    example: '009639000000',
    description: 'The phone number of the admin',
  })
  @IsOptional()
  @IsString()
  phone_number: string;

  @Field(() => String, { description: 'password of the admin' })
  @ApiProperty({
    example: '123456789',
    description: 'The password of the admin',
  })
  @IsOptional()
  @MinLength(8)
  password: string;

  @Field(() => Boolean, { description: 'is the admin active ' })
  @ApiProperty({
    example: true,
    description: 'is the admin avtive or not',
  })
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
