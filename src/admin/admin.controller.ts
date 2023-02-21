import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
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
export class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.create(createAdminDto);

    return this.successResponse(admin);
  }

  @Get()
  async findAll(@Query() filterAdminDto: FilterAdminDto) {
    const result = await this.adminService.findAll(filterAdminDto);

    return this.successPaginationResponse(result, filterAdminDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.adminService.findOne(+id);

    return this.successResponse(admin);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const admin = await this.adminService.update(+id, updateAdminDto);

    return this.successResponse(admin);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const admin = await this.adminService.remove(+id);

    return this.successResponse(admin);
  }
}
