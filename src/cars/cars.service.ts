import {Car} from "./entities/car.entity";
import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import {CarInterface} from "./interfaces/car.interface";

@Injectable()
export class CarsService {
  constructor(
      @InjectRepository(Car)
      private carRepository: Repository<Car>
  ) { }
  async save(entity: CreateCarDto): Promise<CarInterface> {
    return await this.carRepository.save(entity);
  }

  async findAll(): Promise<CarInterface[]> {
    return await this.carRepository.find();
  }

  async findById(id: number): Promise<CarInterface> {
    return await this.carRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findByUrl(url: string): Promise<CarInterface> {
    return await this.carRepository.findOne({
      where: {
        url: url
      }
    });
  }

  async remove(id: number): Promise<CarInterface> {
    const car = await this.findById(id);
    car.isActive = false;
    return this.save(car);
  }
}
