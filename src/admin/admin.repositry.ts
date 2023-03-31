import { Injectable } from '@nestjs/common';
import { BaseRepositry } from 'src/base/base.repositry';
import { DataSource } from 'typeorm';
import { FilterAdminDto } from './dto/filter-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminRepositry extends BaseRepositry<Admin, FilterAdminDto> {
  constructor(private dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  filtable() {
    return {
      full_name: 'like',
      email: 'like',
      active: 'boolean',
      phone_number: 'like',
    };
  }

  getTableName() {
    return 'admin.';
  }
}
