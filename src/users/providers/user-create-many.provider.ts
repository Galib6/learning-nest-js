import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';
import { User } from '../user.entity';

@Injectable()
export class UserCreateManyProvider {
  constructor(
    //inject data source
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUserDto) {
    const newUsers: User[] = [];
    let queryRunner: QueryRunner;
    try {
      //Query Runner
      queryRunner = this.dataSource.createQueryRunner();
      //connect Query runner
      await queryRunner.connect();
      //Start Transactions
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //if successful commit
      await queryRunner.commitTransaction();
    } catch (err) {
      //if unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete transaction', {
        description: String(err),
      });
    } finally {
      try {
        queryRunner.release();
      } catch (err) {
        throw new RequestTimeoutException('Could not complete transaction', {
          description: String(err),
        });
      }
      //release
    }
    return {
      users: newUsers,
    };
  }
}
