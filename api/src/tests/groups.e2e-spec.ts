import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TestModule } from '../test.module';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { UsersService } from '../users/users.service';
import { GroupsService } from '../groups/groups.service';

describe('GroupsController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let groupId: string;
  let user;
  let usersService: UsersService;
  let groupsService: GroupsService;
  let group;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const formattedErrors = errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          }));
          return new BadRequestException(formattedErrors);
        },
      }),
    );

    await app.init();
    usersService = moduleFixture.get<UsersService>(UsersService);
    groupsService = moduleFixture.get<GroupsService>(GroupsService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await usersService.deleteMany();

    const validUser = {
      email: 'test@test.com',
      password: 'password',
      name: 'Test User',
      seeking: true,
    };
    user = await usersService.create(validUser);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(validUser)
      .expect(200);

    authToken = await loginResponse.body.access_token;

    const createGroupDto: CreateGroupDto = {
      name: 'Test Group',
      description: 'A test group',
      adminId: user._id,
    };

    await groupsService.deleteMany();
    group = await groupsService.create(createGroupDto);

    groupId = group.id;
  });

  describe('GET /groups/:id/isUserInGroup/', () => {
    it('should return true if user is part of the group', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/groups/${groupId}/isUserInGroup/`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(body.isUserInGroup).toEqual(true);
    });
  });
});
