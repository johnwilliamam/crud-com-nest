import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(userEmail: string, password: string) {
    const user = await this.usersService.findUserByEmail(userEmail);
    const validPassword = compareSync(password, user.senha);
    console.log(validPassword);
    if(user.demitido){
     throw new Error("You haven't access");
    }
    if (validPassword) {
      const { id, nome, email, cargo } = user
      return { id, nome, email, cargo }
    }
    return null
  }

  async login(user: any){
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload) 
    }
  }

  async getProfile(id:string) {
    const user = await this.usersService.findUserById(id)
    return user
  }
}
