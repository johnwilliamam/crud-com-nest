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
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SetMetadata('isPublic', true)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any ){
    console.log('USER IN REQUEST', req.user)
    return await this.authService.login(req.user)
  }

  @Get('/profile')
  async getProfile(@Request() req: any) {
    if (!req) {
      console.log('AQUI')
      throw new BadRequestException('Invalid request');
    }
    // console.log(req)
    const profile = await this.authService.getProfile(req.user)
    return profile;
  }

}
