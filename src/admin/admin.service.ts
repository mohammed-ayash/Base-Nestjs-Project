import { Injectable } from '@nestjs/common';
import { AdminRepositry } from './admin.repositry';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { BaseService } from '../base/base.service';
import { FilterAdminDto } from './dto/filter-admin.dto';

@Injectable()
export class AdminService extends BaseService<
  CreateAdminDto,
  UpdateAdminDto,
  FilterAdminDto
> {
  constructor(private readonly adminRepository: AdminRepositry) {
    super(adminRepository, 'admin');
  }

  async create(createAdminDto: CreateAdminDto) {
    const admin = new Admin();
    createAdminDto.password = await this.passwordHash(createAdminDto.password);
    Object.assign(admin, createAdminDto);

    return await this.adminRepository.save(admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOneByOrFail({ id });

    if (updateAdminDto.password)
      updateAdminDto.password = await this.passwordHash(
        updateAdminDto.password,
      );

    return await this.adminRepository.save({ ...admin, ...updateAdminDto });
  }

  async findOneByEmail(email: string): Promise<Admin | undefined> {
    return this.adminRepository.findOneBy({ email });
  }

  async passwordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync();

    return await bcrypt.hashSync(password, salt);
  }

  getNewEntity() {
    return new Admin();
  }
}
