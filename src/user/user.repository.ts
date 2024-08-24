import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
  async findAll() {
    return await this.userRepo
    .createQueryBuilder('user')
    .getMany();
  }

  async findOne(id: number) {
    return await this.userRepo
    .createQueryBuilder('user')
    .andWhere('user.id = :id', {id})
    .getOne();
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 15);
    const newUser = this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    await this.userRepo
    .createQueryBuilder('user')
    .update()
    .set(data)
    .andWhere('user.id = :id', {id})
    .execute();

    return this.userRepo.findOneBy({id});
  }

  async remove(id: number) {
    return await this.userRepo.softDelete({id});
  }
}
