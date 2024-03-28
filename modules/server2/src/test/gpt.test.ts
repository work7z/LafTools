import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthRoute } from '@routes/auth.route';

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      console.log('this is ok');
    });
  });
});
