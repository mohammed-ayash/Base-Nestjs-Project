import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
@InputType()
export class FilterAdminDto {
  @Field(() => String, {
    description: 'full name of the admin',
    nullable: true,
  })
  @ApiProperty({
    example: 'John Ar',
    description: 'The fullname of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  full_name: string;

  @Field(() => String, { description: 'email of the admin', nullable: true })
  @ApiProperty({
    example: 'jo.ar@test.com',
    description: 'The email of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @Field(() => String, {
    description: 'phone number of the admin',
    nullable: true,
  })
  @ApiProperty({
    example: '009639000000',
    description: 'The phone number of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone_number: string;

  @Field(() => Boolean, { description: 'is the admin active ', nullable: true })
  @ApiProperty({
    example: true,
    description: 'is the admin avtive or not',
    required: false,
  })
  @IsBooleanString()
  @IsOptional()
  active?: boolean;

  @Field(() => Int, { description: 'The page number', nullable: true })
  @ApiProperty({
    example: 1,
    description: 'The page number',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @Field(() => Int, { description: 'The item count per Page', nullable: true })
  @ApiProperty({
    example: 10,
    description: 'The item count per Page',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
