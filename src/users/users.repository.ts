import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data.source';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './dto/user.dto';
import User from './entities/user.entity';

export const UsersRepository = AppDataSource.getRepository(User).extend({
  async findAll(): Promise<IUser[]>  {
    const findusers = await this.find({ where: { demitido: false } });
    return findusers;
  },
  async findById(id: string): Promise<IUser> {
    const findusers = await this.findOne({ where: { id, demitido: false } });
    if(!findusers) throw new BadRequestException('Usuário não encontrado')
    return findusers;
  },
  async findByEmail(email: string): Promise<User>{
    const findUser = await this.findOne({where:{email}})
    if(!findUser) throw new NotFoundException('User not found')
    return findUser
  },
  async createUser(userData: CreateUserDto): Promise<IUser> {
    const { nome, senha, email,cargo, matricula } = userData;
    const userExists = await this.findOne({where: {nome: nome}})
    const emailExists = await this.findOne({where: {email: email}})
    if(userExists) throw new BadRequestException('Já existe um usuário com esse nome')
    if(emailExists) throw new BadRequestException('Já existe um usuário cadastrado com esse e-mail') 
    const user = await this.create();
    user.nome = nome;
    user.senha = senha
    user.email = email
    user.cargo = cargo;
    user.matricula = matricula;
    try {
      const userCreated = await user.save();
      return userCreated;
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar usuário');
    }
  },
  async findByName(nome: string): Promise<IUser> {
    const findUser = await this.findOne({ where: { nome } });
    if (findUser) throw new BadRequestException('Usuário não encontrado');
    return findUser;
  },
  async findByRegistration(matricula: string): Promise<IUser> {
    const findByRegistration = await this.findOne({ where: { matricula } });
    if (findByRegistration)
      throw new BadRequestException('Usuário não encontrado');
    return findByRegistration;
  },
  async updateUser(userData: UpdateUserDto, id: string): Promise<IUser> {
    const { cargo } = userData
    const user = await this.findOne({ where: { id } });
    if(!user) throw new BadRequestException('Usuário não encontrado')
    user.cargo = cargo;
    try {
      await user.save();
      return user;
    } catch (err) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  },
  async deleteUser(id: string): Promise<IUser> {
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
