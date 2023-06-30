import { BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "src/users/users.repository";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({    
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'key'
        })
    }
    async validate(payload: any) {
        const user = await UsersRepository.findOne({ where: { id: payload.sub } });
        if(!user) throw new BadRequestException('Usuário não encontrado')
        return { userId: payload.sub, emai: payload.email }
    }
}