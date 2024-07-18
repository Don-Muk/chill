import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { AuthorsModule } from './authors/authors.module';
import { MusicModule } from './music/music.module';
>>>>>>> Stashed changes

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
<<<<<<< Updated upstream
    password: 'root',
    database: 'chill',
    autoLoadEntities: true,
    synchronize: true,
  })],
=======
    password: 'B.vardidze03',
    database: 'seeSharp DB',
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }), AuthorsModule, MusicModule],
>>>>>>> Stashed changes
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
