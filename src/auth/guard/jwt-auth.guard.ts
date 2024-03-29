import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector) {
            super();
        }
        canActivate(context: ExecutionContext) {
          const isPublic = this.reflector.getAllAndOverride<boolean>('key', [context.getHandler(), context.getClass()]);  
          if(isPublic) {
              return true
            }
            return super.canActivate(context)
        }
    }