import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { EmpModule } from './emp/emp.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { CoursesController } from './courses/controllers/courses.controller';
import { LessonsController } from './courses/controllers/lessons.controller';

/*
mongoose connection - set mongo url from env
*/
const mongoConnection = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    uri: config.get<string>('MONGO_URL'),
  }),
});

@Module({
  imports: [
    AuthModule,
    CoursesModule,
    EmpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    mongoConnection,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {

    consumer
        .apply(GetUserMiddleware)
        .forRoutes(
          CoursesController,
          LessonsController
      );

  }
}
