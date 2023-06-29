import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(userEmail: string, password: string) {
    const user = await this.usersService.findUserByEmail(userEmail);
    const validPassword = compareSync(password, user.senha);
    if(user.demitido){
     throw new Error("You haven't access");
    }
    if (validPassword) {
      const { nome, email, cargo } = user
      return { nome, email, cargo }
    }
  }
}
