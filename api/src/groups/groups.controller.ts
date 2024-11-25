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
  HttpCode,
  Req,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PostsService } from '../posts/posts.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ObjectId } from 'mongodb';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService, private readonly postService: PostsService) {}

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
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.groupService.remove(id);
  }

  @Post(':id/users')
  @UseGuards(AuthGuard)
  async addUser(@Param('id') groupId: string, @Body('postId') postId: string, @Req() req: any) {
    const userId = req.user.userId;
    const group = await this.groupService.addUser(groupId, userId);
    const foundMemeber = group.userIds.find(user => user._id.toString() === userId);
    if( foundMemeber !== null) {
      const i = await this.postService.remove(postId);
      return group;
    }
    return null;
  }

  @Delete(':id/users')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async removeUser(
    @Param('id') groupId: string,
    @Body('userId') userId: string,
  ) {
    return await this.groupService.removeUser(groupId, userId);
  }
}
