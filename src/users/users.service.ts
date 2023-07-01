import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './dto/user.dto';
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
  async findUserById(id: string) {
    return await UsersRepository.findById(id);
  }
  async createUser(createUserDto: CreateUserDto) {
    const created = await UsersRepository.createUser(createUserDto);
    console.log(created);
    return created;
  }
  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<IUser> {
    const user = await UsersRepository.updateUser(updateUserDto, id);
    return user;
  }

  async remove(id: string) {
    const findUser = await UsersRepository.findById(id);
    if (!findUser) throw new BadRequestException('User not found');
    await UsersRepository.deleteUser(id);
    return 'User deleted';
  }
}