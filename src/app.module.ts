import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'chill',
    autoLoadEntities: true,
    synchronize: true,
  }),AuthorsModule,AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
