import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { TestFn } from '@interfaces/users.interface';

export class TestFnModel extends Model<TestFn> implements TestFn {
  public id: number;
  public name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function TestFnModelGenerator(sequelize: Sequelize): typeof TestFnModel {
  TestFnModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'testfn',
      sequelize,
    },
  );

  return TestFnModel;
}
