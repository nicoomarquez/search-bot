import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {CarSearcherService} from "./car-searcher.service";

@Controller('car-searcher')
export class CarSearcherController {
  constructor(private readonly carSearcher: CarSearcherService) {}
  @Get()
  execute() {
    return this.carSearcher.execute();
  }

}
