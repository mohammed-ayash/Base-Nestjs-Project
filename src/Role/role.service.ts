import { Injectable } from '@nestjs/common';
import { RoleRepositry } from './role.repositry';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { BaseService } from '../base/base.service';
import { FilterRoleDto } from './dto/filter-role.dto';

@Injectable()
export class RoleService extends BaseService<
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  FilterRoleDto
> {
  constructor(private readonly roleRepository: RoleRepositry) {
    super(roleRepository, 'role');
  }

  getNewEntity() {
    return new Role();
  }
}
