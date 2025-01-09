import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../test.module';
import { UsersService } from '../users/users.service';

describe('AuthController (e2e)', () => {
  //arrange
  let app: INestApplication;
  let userService: UsersService;

  afterEach(async () => {
    // Cleanup users after each test
    await userService.deleteMany();
  });

  afterAll(async () => {
    // Cleanup and close the app after all tests
    await app.close();
  });

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
    userService = moduleFixture.get<UsersService>(UsersService);
  });

  describe('AuthController /auth/signin', () => {
    it('should not log in a non-existent user', async () => {
      //act
      const { body } = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'nonexistent@test.com', password: 'password' })
        .expect(404);
      //asseert
      expect(body.message).toEqual(
        'User with email - nonexistent@test.com not found',
      );
    });
  });
});
