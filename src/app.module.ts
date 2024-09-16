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
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './auth/guards/admin.guard';
import { PublicGuard } from './auth/guards/public.guard';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'B.vardidze03',
    database: 'seesharp',
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }),
  JwtModule.register({
    secret: 'seeSharpSecurity',
    global: true,
  }),
  AlbumsModule, AuthorsModule, MusicModule, SearchModule, UserModule, PlaylistModule, ListenersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AdminGuard, PublicGuard],
})
export class AppModule {}
