import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ramonliranidev:lirani267@cluster0.xq0z4bb.mongodb.net/',
    ),
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
