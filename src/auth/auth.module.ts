import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
      secret: 'key',
      signOptions: {expiresIn: '5000s' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthController],
  exports: [AuthController]
})
export class AuthModule {}
