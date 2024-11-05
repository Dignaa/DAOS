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
    console.log('auth header: ', authHeader);
    const token = request.headers['authorization']?.split(' ')[1]; // Assuming the format is "Bearer token"

    console.log('JWT Secret:', env.JWT_SECRET);
    if (!token) {
      return false; // No authorization header
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, env.JWT_SECRET);
      request['user'] = decoded;

      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; // Token is invalid or expired
    }
  }
}
