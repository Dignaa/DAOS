import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(pass, user?.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    user.lastLoggedIn = new Date();
    user.save();
    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
