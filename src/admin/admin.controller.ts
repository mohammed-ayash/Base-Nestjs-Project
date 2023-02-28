import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';
import { ControllerFactory } from 'src/base/base.controller';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { FilterAdminDto } from './dto/filter-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('admin')
@ApiTags('Admin')
@UseInterceptors(TransformInterceptor)
export class AdminController extends ControllerFactory<
  CreateAdminDto,
  UpdateAdminDto,
  FilterAdminDto
>(CreateAdminDto, UpdateAdminDto, FilterAdminDto) {
  constructor(private readonly adminService: AdminService) {
    super(adminService);
  }
}
