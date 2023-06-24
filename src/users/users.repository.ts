import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data.source';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export const UsersRepository = AppDataSource.getRepository(User).extend({
  async findAll() {
    const findusers = await this.find({ where: { demitido: false } });
    return findusers;
  },
  async findById(id: string) {
    const findusers = await this.findOne({ where: { id, demitido: false } });
    return findusers;
  },
  async findByEmail(email: string){
    const findUser = await this.findOne({where:{email}})
    if(!findUser) throw new NotFoundException('User not found')
    return findUser
  },
  async createUser(userData: CreateUserDto) {
    const { name, cargo, matricula } = userData;
    const userExist = await this.findOne({ where: { name } });
    const matriculaExist = await this.findOne({ where: { matricula } });
    if (userExist || matriculaExist) {
      throw new Error('Usuário já cadastrado');
    }
    const user = await this.create();
    user.name = name;
    user.cargo = cargo;
    user.matricula = matricula;
    try {
      const userCreated = await user.save();
      return userCreated;
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar usuário');
    }
  },
  async findByName(name: string) {
    const findUser = await this.findOne({ where: { name } });
    if (!findUser) throw new BadRequestException('Usuário não encontrado');
    return findUser;
  },
  async findByRegistration(registration: string) {
    const findByRegistration = await this.findOne({ where: { registration } });
    if (!findByRegistration)
      throw new BadRequestException('Usuário não encontrado');
    return findByRegistration;
  },
  async updateUser(userData: UpdateUserDto, id: string) {
    const user = await this.findOne({ where: { id } });
    if (!user) throw new BadRequestException('Usuário não encontrado');
    user.cargo = userData.cargo;
    try {
      await user.save();
      return user;
    } catch (err) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  },
  async deleteUser(id: string) {
    const user = await this.findOne({ where: { id } });
    if (!user) throw new BadRequestException('Usuário não encontrado');
    user.demitido = true;
    try {
      await user.save();
      return user;
    } catch (err) {
      throw new BadRequestException('Erro ao deletar usuário');
    }
  },
});
