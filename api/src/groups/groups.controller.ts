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
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PostsService } from '../posts/posts.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ObjectId } from 'mongodb';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupService: GroupsService,
    private readonly postService: PostsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() createGroupDto: CreateGroupDto) {
    const adminId: string = req.user.userId;
    createGroupDto.adminId = new ObjectId(adminId);
    createGroupDto.userIds = [new ObjectId(adminId)];
    return await this.groupService.create(createGroupDto);
  }

  @Get(':id/isAdmin')
  @UseGuards(AuthGuard)
  async isAdmin(
    @Param('id') groupId: string,
    @Req() req: any,
  ): Promise<{ isAdmin: boolean }> {
    const userId = req.user.userId; // Extracted from the token
    const isAdmin = await this.groupService.isUserAdmin(groupId, userId);
    if (isAdmin === null) {
      throw new NotFoundException('Ensemble not found');
    }
    return { isAdmin };
  }

  @Get(':id/isUserInGroup')
  @UseGuards(AuthGuard)
  async isUserInGroup(
    @Param('id') groupId: string,
    @Req() req: any,
  ): Promise<{ isUserInGroup: boolean }> {
    const userId = req.user.userId;
    const isUserInGroup = await this.groupService.isUserInGroup(
      groupId,
      userId,
    );
    if (isUserInGroup === null) {
      throw new NotFoundException('Ensemble not found');
    }
    return { isUserInGroup };
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
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    return await this.groupService.update(userId, id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.userId;
    return await this.groupService.remove(userId, id);
  }

  @Post(':id/users')
  @UseGuards(AuthGuard)
  async addUser(
    @Param('id') groupId: string,
    @Body('postId') postId: string,
    @Req() req: any,
  ) {
    const userId: string = req.user.userId;

    const group = await this.groupService.findOne(groupId);

    if (
      group.userIds.find((user) => user._id === new ObjectId(userId)) !== null
    ) {
      return new BadRequestException('User already joined in the ensamble');
    }

    const updatedGroup = await this.groupService.addUser(groupId, userId);

    if (
      updatedGroup.userIds.find((user) => user._id === new ObjectId(userId)) !==
      null
    ) {
      await this.postService.remove(userId, postId);
      return updatedGroup;
    }

    return new InternalServerErrorException(
      'An error occured while trying to add a user into an enasmble. Please try again!',
    );
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
