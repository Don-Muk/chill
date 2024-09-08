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

  async findByEmailAndPassword(email: string) {
    return this.userRepo.findOne({ where:  { email: email }, select: { email: true, password: true, loginAttempts: true, name: true } });
  }

  async incrementAttempts(id : number) {
    const user = await this.userRepo.findOne({ where: { id } });
    user.loginAttempts++;
    await this.userRepo.update(user.id, user);
  }

  async lockedDate(id : number) {
    const user = await this.userRepo.findOne({ where: { id } });
    user.lockedDate = new Date();
    await this.userRepo.update(user.id, user);
  }

  async unlockedUser(id : number) {
    const user = await this.userRepo.findOne({ where: { id } });
    user.lockedDate = null;
    await this.userRepo.update(user.id, user);
  }

  async resetIncrementAttempts(id : number) {
    const user = await this.userRepo.findOne({ where: { id } });
    user.loginAttempts = 0;
    await this.userRepo.update(user.id, user);
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 15);
    const newUser = this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const saved = await this.userRepo.save(newUser);
    delete saved.password;
    return saved;
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
