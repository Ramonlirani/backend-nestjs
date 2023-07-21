import { Body, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const cars = await this.carModel.find().exec();
    if (!cars || cars.length === 0) {
      throw new NotFoundException('Nenhum carro encontrado');
    }
    return cars;
  }

  async findOne(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('ID inválido');
    }
    const car = await this.carModel.findById(id).exec();
    if (!car) {
      throw new NotFoundException('Carro não encontrado');
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('ID inválido');
    }
    const result = await this.carModel
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
    if (!result) {
      // Caso o documento não tenha sido encontrado, lança uma NotFoundException
      throw new NotFoundException('Item não encontrado');
    }
    return {
      message: 'Item alterado com sucesso',
    };
  }

  async remove(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new NotFoundException('ID inválido');
    }

    const result = await this.carModel
      .deleteOne({
        _id: id,
      })
      .exec();
    if (result.deletedCount === 0) {
      // Caso o documento não tenha sido encontrado, lança uma NotFoundException
      throw new NotFoundException('Item não encontrado');
    }
    return {
      message: 'Item deletado com sucesso',
    };
  }
}
