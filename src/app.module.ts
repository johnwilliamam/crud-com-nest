import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeeService, UsersService } from './users/users.service';


@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'projetos',
      entities: ['*/src/users/entities/*{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [UsersService, EmployeeService, AuthModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
