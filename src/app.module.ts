import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { AuthorsModule } from './authors/authors.module';
import { MusicModule } from './music/music.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ListenersModule } from './listeners/listeners.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

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
  }),
  JwtModule.register({
    global: true,
    secret: 'secret'
  }),
  AlbumsModule, AuthorsModule, MusicModule, SearchModule, UserModule, PlaylistModule, ListenersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
