import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enum/roles.enum';


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }
  async findAll() {
    return await this.userRepo
      .createQueryBuilder('user')
      .getMany();
  }

  async findOne(id: number) {
    return await this.userRepo
      .createQueryBuilder('user')
      .andWhere('user.id = :id', { id })
      .getOne();
  }

  async findByEmailAndReturnPassword(email: string) {
    return this.userRepo.findOne({
      where: { email: email },
      select: {id: true,email: true,password: true, role: true}
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data)
        newUser.password = await bcrypt.hash(newUser.password, 10)
        try {
            const result = await this.userRepo.save(newUser)
            const { password, ...user } = result
            return user
        } catch (err) {
            if (err.errno == 1062) {
                return "this email already exists"
            }
        }
  }

  async update(id: number, data: UpdateUserDto) {
    await this.userRepo
      .createQueryBuilder('user')
      .update()
      .set(data)
      .andWhere('user.id = :id', { id })
      .execute();

    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.userRepo.softDelete({ id });
  }
}
