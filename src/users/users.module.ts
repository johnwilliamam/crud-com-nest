import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { EmployeeService, UsersService } from './users.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, EmployeeService],
  exports: [TypeOrmModule, EmployeeService, UsersService],
})
export class UsersModule {}
