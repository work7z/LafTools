import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { Test2 } from '@interfaces/users.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<Test2[]> {
    const allUser: Test2[] = await DB.Users2.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<Test2> {
    const findUser: Test2 = await DB.Users2.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<Test2> {
    const findUser: Test2 = await DB.Users2.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Test2 = await DB.Users2.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<Test2> {
    const findUser: Test2 = await DB.Users2.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await DB.Users2.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: Test2 = await DB.Users2.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<Test2> {
    const findUser: Test2 = await DB.Users2.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.Users2.destroy({ where: { id: userId } });

    return findUser;
  }
}
