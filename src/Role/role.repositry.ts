import { Injectable } from '@nestjs/common';
import { BaseRepositry } from 'src/base/base.repositry';
import { DataSource } from 'typeorm';
import { FilterRoleDto } from './dto/filter-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleRepositry extends BaseRepositry<Role, FilterRoleDto> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  filtable() {
    return {
      name: 'like',
      display_name: 'like',
    };
  }

  getTableName() {
    return 'role.';
  }
}
