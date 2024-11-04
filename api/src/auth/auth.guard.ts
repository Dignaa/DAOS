import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    const authHeader = request.headers['authorization'];
    console.log(authHeader);
    console.log('JWT Token:', env.JWT_SECRET);
    if (!authHeader) {
      return false; // No authorization header
    }

    try {
      // Verify the token
      const decoded = jwt.verify(authHeader, env.JWT_SECRET);
      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; // Token is invalid or expired
    }
  }
}
