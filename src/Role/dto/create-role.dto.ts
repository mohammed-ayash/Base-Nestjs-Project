import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'super admin',
    description: 'The display name of the role',
  })
  @IsNotEmpty()
  @IsString()
  display_name: string;

  @ApiProperty({
    example: 'super-admin',
    description: 'The name of the role',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'super-admin',
    description: 'The name of the role',
  })
  @IsArray()
  @ArrayNotEmpty()
  permissions: string[];
}
