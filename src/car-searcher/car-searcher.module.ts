import { Module } from '@nestjs/common';
import { CarSearcherService } from './car-searcher.service';
import {UrlHelper} from "./url.helper";
import {PublicationsRetrieverModule} from "../publications-retriever/publications-retriever.module";
import {CarsModule} from "../cars/cars.module";
import {CarsService} from "../cars/cars.service";
import {CarSearcherController} from "./car-searcher.controller";
@Module({
  imports: [PublicationsRetrieverModule, CarsModule],
  providers: [CarSearcherService, UrlHelper, CarsService],
  controllers: [CarSearcherController],
  exports: [CarSearcherService]
})
export class CarSearcherModule {}
