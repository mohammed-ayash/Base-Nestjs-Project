import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';
import { ResolverFactory } from 'src/base/base.resolver';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { FilterAdminDto } from './dto/filter-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminType } from './type/admin.type';
import { AllAdminType } from './type/all-admin.type';

@UseGuards(JwtAuthGuard)
@Resolver(() => Admin)
export class AdminResolver extends ResolverFactory<
  CreateAdminDto,
  UpdateAdminDto,
  FilterAdminDto,
  AdminType,
  AllAdminType
>(
  CreateAdminDto,
  UpdateAdminDto,
  FilterAdminDto,
  AdminType,
  AllAdminType,
  'Admin',
) {
  constructor(private readonly adminService: AdminService) {
    super(adminService);
  }
}
