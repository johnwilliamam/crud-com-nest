import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SetMetadata('isPublic', true)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any){
    return await this.authService.login(req.user)
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getProfile(@Request() req: any) {
    if (!req || !req.user) {
      throw new BadRequestException('Invalid request');
    }
    return req.user;
  }

}
