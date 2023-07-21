import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './entities/car.entity';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  create(createCarDto: CreateCarDto) {
    const car = new this.carModel(createCarDto);
    return car.save();
  }

  findAll() {
    return this.carModel.find();
  }

  findOne(id: string) {
    return this.carModel.findById(id);
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateCarDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.carModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
