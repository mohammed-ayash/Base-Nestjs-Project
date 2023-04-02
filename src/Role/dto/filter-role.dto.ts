import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterRoleDto {
  @ApiProperty({
    example: 'super-admin',
    description: 'The name of the role',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'super admin',
    description: 'The display name of the role',
    required: false,
  })
  @IsString()
  @IsOptional()
  display_name: string;

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
