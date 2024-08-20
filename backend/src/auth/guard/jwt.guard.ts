import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`Attempting access to ${request.method} ${request.url}`);
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      const message = err ? err.message : info ? info.message : 'Unauthorized';
      this.logger.warn(
        `Unauthorized access attempt to ${request.method} ${request.url}: ${message}`,
      );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
