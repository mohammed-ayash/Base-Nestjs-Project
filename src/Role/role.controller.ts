import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';
import { ControllerFactory } from 'src/base/base.controller';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('role')
@ApiTags('Role')
@UseInterceptors(TransformInterceptor)
export class RoleController extends ControllerFactory<
  CreateRoleDto,
  UpdateRoleDto,
  FilterRoleDto
>(CreateRoleDto, UpdateRoleDto, FilterRoleDto, 'role') {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
