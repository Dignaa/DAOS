import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { env } from 'node:process';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, env.JWT_SECRET);
      request['user'] = decoded;

      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);

      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException(
          'Token verification failed: JWT Token has expired',
        );
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException(
          'Token verification failed: Invalid JWT Token',
        );
      }
      throw new UnauthorizedException(
        'Unauthorized: Token verification failed',
      );
    }
  }
}
