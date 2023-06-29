import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EmployeeService, UsersService } from './users.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, EmployeeService],
  exports: [EmployeeService, UsersService],
})
export class UsersModule {}
