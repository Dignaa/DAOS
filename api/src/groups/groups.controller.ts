import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ObjectId } from 'mongodb';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createGroupDto: CreateGroupDto) {
    const adminId: string = req.user.userId;
    createGroupDto.adminId = new ObjectId(adminId);
    createGroupDto.userIds = [new ObjectId(adminId)];
    return await this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.groupService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.groupService.remove(id);
  }

  @Post(':id/users')
  @UseGuards(AuthGuard)
  async addUser(@Param('id') groupId: string, @Body('userId') userId: string) {
    return await this.groupService.addUser(groupId, userId);
  }

  @Delete(':id/users')
  @UseGuards(AuthGuard)
  async removeUser(
    @Param('id') groupId: string,
    @Body('userId') userId: string,
  ) {
    return await this.groupService.removeUser(groupId, userId);
  }
}
