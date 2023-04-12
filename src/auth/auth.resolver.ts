import { UseGuards, BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminType } from 'src/admin/type/admin.type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './Guard/jwt-auth.guard';
import { LoginType } from './type/login.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginType)
  async login(@Args('loginDto', { type: () => LoginDto }) loginDto: LoginDto) {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );
    if (!admin) throw new BadRequestException(`Email or password are invalid`);
    return this.authService.login(admin);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AdminType)
  async getProfile(@Context() ctx) {
    return ctx.req.user;
  }
}
