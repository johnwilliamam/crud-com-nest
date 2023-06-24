import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor() {}
  async findAllUsers() {
    return await UsersRepository.findAll();
  }

  async findUserByName(name: string) {
    return UsersRepository.findByName(name);
  }
  async findUserByRegistration(matricula: string) {
    return await UsersRepository.findByRegistration(matricula);
  }
  async findUserByEmail(email: string) {
    return await UsersRepository.findByEmail(email);
  }
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, matricula } = createUserDto;
    const userExists = await UsersRepository.findByName(name);
    const emailExists = await UsersRepository.findByEmail(email);
    const matriculaExists = await UsersRepository.findByRegistration(matricula);
    if (userExists || matriculaExists || emailExists)
      throw new BadRequestException(`User already exists`);
    const created = await UsersRepository.createUser(createUserDto);
    console.log(created);
    return created;
  }
  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<CreateUserDto> {
    const user = UsersRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');
    await UsersRepository.updateUser(updateUserDto, id);
    return user;
  }

  async remove(id: string) {
    const findUser = await UsersRepository.findById(id);
    if (!findUser) throw new BadRequestException('User not found');
    await UsersRepository.deleteUser(id);
    return 'User deleted';
  }
}

export type Employee = any;

export class EmployeeService {
  private readonly employee = [
    {
      userId: 1,
      username: 'John',
      password: 'Teste',
    },
    {
      userId: 2,
      username: 'William',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<Employee | undefined> {
    return this.employee.find((employee) => employee.username === username);
  }
}
