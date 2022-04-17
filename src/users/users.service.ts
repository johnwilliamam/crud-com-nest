import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public usersRepository: Repository<User>,
  ){ }
   /*create({ createUserDto }: { createUserDto: CreateUserDto; }): any{
  /*const user = new this.usersRepository();
    return user.save();*/
    async create(createUserDto: CreateUserDto){
    try{
      const repo = getRepository(User);
      var res = await repo.save(createUserDto);
      console.log(createUserDto);
      return res;
  } catch(err){
    console.log(res)
    console.log('error:', err.message);
  } }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User>{
    try{
      const repo = getRepository(User);
      const res = await repo.update(id, updateUserDto);
      console.log(updateUserDto);
      var retorno = this.findOne(id)
      console.log(retorno);
      return retorno
  } catch(err){
    console.log(`resposta ${retorno}`)
    console.log('error:', err.message);
  } }
    
  async remove(id: number, name?: string): Promise<any>{
    const nome = (await this.findOne(id)).name
    console.log(nome)
  try{
   const res = await this.usersRepository.delete(id);
   console.log(res)
   const retorno = `Deletado usuário ${nome} de id ${id} com sucesso`
   return retorno
  } catch(err) {
    const res = `Falha ao deletar o usuário id ${User.name}. Erro: ${err}` 
    console.log(res)
    console.log('error:', err.message)
  }
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
    return this.employee.find(employee => employee.username === username);
  }
}
