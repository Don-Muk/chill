import { Module } from '@nestjs/common';
import { AuthorController } from './authors.controller';
import { AuthorService } from './authors.service';
import { AuthorRepository } from './authors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/authors.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    controllers: [AuthorController],
    providers: [AuthorService,AuthorRepository],
})
export class AuthorsModule {}
