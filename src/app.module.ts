import { join } from 'path';

import { Module } from '@nestjs/common';  
import { ConfigModule } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ApplicantModule } from './applicant/applicant.module';
import { UsersModule } from './users/users.module'; 
import { FilesModule } from './files/files.module';


@Module({
  imports: [     
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: { 
        ssl: process.env.STAGE === 'prod' 
        ? { rejectUnauthorized: false } 
        : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      //logging: true,
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    ApplicantModule,
    
    UsersModule,
    
    FilesModule, 
  ], 
})
export class AppModule {}
 