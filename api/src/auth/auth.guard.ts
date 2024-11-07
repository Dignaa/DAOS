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
    const token = request.headers['authorization']?.split(' ')[1]; // Assuming the format is "Bearer token"
    if (!token) return false; // No authorization header

    try {
      // Verify the token
      const decoded = jwt.verify(token, env.JWT_SECRET);
      request['user'] = decoded;

      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      if (error instanceof jwt.TokenExpiredError) {
        console.error('JWT Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error('Invalid JWT Token');
      }
      return false; // Token is invalid or expired
    }
  }
}
