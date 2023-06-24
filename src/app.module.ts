/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeeService, UsersService } from './users/users.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    AppService
  ],
  controllers: [AppController],
  providers: [UsersService, EmployeeService, AuthModule, AppService]
})
export class AppModule {
  constructor() { }
}
