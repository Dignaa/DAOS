import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GroupsService } from '../groups/groups.service';
import { UsersResponseDto } from './dto/users-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UsersResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return plainToInstance(UsersResponseDto, user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Request() req) {
    const userId: string = req.user.userId;
    const user = await this.usersService.findOne(userId);
    const posts = await this.usersService.getPosts(userId);
    const usersResponseDto = { ...user, posts };
    return plainToInstance(UsersResponseDto, usersResponseDto);
  }

  @Get('groups')
  @UseGuards(AuthGuard)
  async getGroups(@Request() req) {
    const userId: string = req.user.userId;
    const groups = await this.groupsService.getGroupsForUser(userId);
    return groups;
  }

  @Get()
  async find(): Promise<UsersResponseDto[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(UsersResponseDto, users);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<UsersResponseDto> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(UsersResponseDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UsersResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return plainToInstance(UsersResponseDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Get(':userId/groups')
  async getUserGroups(@Param('userId') userId: string) {
    const groups = await this.groupsService.getGroupsForUser(userId);
    return groups;
  }
}
