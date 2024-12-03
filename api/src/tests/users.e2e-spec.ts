import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import * as request from 'supertest';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { TestModule } from '../test.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authToken: string;

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
    // Create a user for testing and obtain a token once
    await usersService.deleteMany();
    const validUser: CreateUserDto = {
      email: 'loggedInUser@test.dk',
      password: 'password',
      name: 'Test User',
      seeking: true,
    };
    await request(app.getHttpServer())
      .post('/users')
      .send(validUser)
      .expect(201);

    // Login to get a JWT token
    const { body: loginResponse } = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'loggedInUser@test.dk', password: 'password' })
      .expect(200);

    authToken = loginResponse.access_token;
  });
  beforeEach(async () => {
    await usersService.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users/profile', () => {
    it('should not return user profile for unauthenticated user', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/profile')
        .expect(401);

      expect(body.message).toEqual('Authorization token is missing');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'find@test.com',
        password: 'password',
        seeking: true,
      };

      const user = await usersService.create(createUserDto);

      const { body } = await request(app.getHttpServer())
        .get(`/users/${user._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(body.email).toEqual(createUserDto.email);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(body.message).toEqual('Invalid ID format');
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update user information', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'update@test.com',
        password: 'password',
        seeking: true,
      };

      const user = await usersService.create(createUserDto);
      const updateUserDto: UpdateUserDto = { seeking: false };

      const { body } = await request(app.getHttpServer())
        .patch(`/users/${user._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateUserDto)
        .expect(200);

      expect(body.seeking).toBe(false);
    });

    it('should throw NotFoundException if user to update does not exist', async () => {
      const updateUserDto: UpdateUserDto = { seeking: false };

      const { body } = await request(app.getHttpServer())
        .patch('/users/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateUserDto)
        .expect(404);

      expect(body.message).toEqual('Invalid ID format');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'delete@test.com',
        password: 'password',
        seeking: true,
      };

      const user = await usersService.create(createUserDto);

      await request(app.getHttpServer())
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      const { body } = await request(app.getHttpServer())
        .get(`/users/${user._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(body.message).toEqual(`User with ID ${user._id} not found`);
    });

    it('should throw NotFoundException if user to delete does not exist', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/users/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(body.message).toEqual('Invalid ID format');
    });
  });
});
