import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/music.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'testirovka',
    autoLoadEntities: true,
    synchronize: true,
  }), MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
